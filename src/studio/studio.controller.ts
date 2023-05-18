import { Body, Controller, Get, Logger, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ReviewService } from '../review/review.service'
import { User } from '../users/user.entity'
import { UserService } from '../users/user.service'
import { StudioDto } from './dto/studio.dto'
import { StudioFilter } from './dto/studio.filter'
import { StudioRegistrationDto } from './dto/studio.registration.dto'
import { ParseStudioFilterPipe } from './ParseStudioFilterPipe'
import { Studio } from './studio.entity'
import { StudioService } from './studio.service'
import { STUDIO_STATUS } from './studio.status'
import { UserNotificationService } from '../userNotification/userNotification.service'
import { AppointmentService } from '../appointment/appointment.service'
@Controller('studios')
// @UseGuards(AuthGuard('jwt'))
export class StudioController {
  private log: Logger = new Logger('StudioController')

  constructor(
    private readonly userService: UserService,
    private reviewService: ReviewService,
    private studioService: StudioService,
    private readonly appointmentService: AppointmentService,
    private UserNotificationService: UserNotificationService,
  ) { }

  @Get(':id')
  async getStudio(@Param('id') studioId: string): Promise<StudioDto> {
    return this.studioService.getStudioDto(studioId)
  }

  @Get('users/:userId')
  async getUserStudios(@Param('userId') userId: string): Promise<StudioDto[]> {
    this.log.log('[GET] studios which belong to user')
    const user = await this.userService.getUser(userId)
    const userStudios = await this.studioService.getStudiosByUser(user)
    return this.studioService.transformToDtos(userStudios)
  }

  @Post('admin')
  async getStudiosForAdmin(): Promise<any> {
    const data = await this.appointmentService.getAllStudiosForAdmin();

    if (data.length == 0) {

      return [];
    }
    const studios = await this.studioService.getStudiosByIds(data)
    return studios;
  }

  @Get()
  async getStudios(
    @Query(ParseStudioFilterPipe) filter?: StudioFilter
  ): Promise<StudioDto[]> {
    this.log.debug(`getStudios - filter: ${JSON.stringify(filter)}`)
    if (JSON.stringify(filter) === JSON.stringify({}) || filter?.fetchAll) {
      return this.studioService.getAllStudios()
    }
    return this.studioService.getStudiosWithFilter(filter)
  }

  @Post('temp')
  async getAppointStudio(): Promise<any> {
    console.log("hiit ");
    const studios = await this.studioService.getAllStudios();
    let data = [];
    await Promise.all(studios.map(async (studio) => {
      const appointment = await this.appointmentService.getStudioByStudioId(studio.id);
      if (appointment.length > 0) {
        data.push(studio)
      }
      return null;
    }));
    console.log('data.length :>> ', data.length);
    return data;
  }

  @Get('reviews/:studioId')
  async getStudioReviews(@Param('studioId') studioId: string) {
    const studio = await this.studioService.getStudio(studioId)
    const reviews = await this.reviewService.getReviewsByStudio(studio)
    return (reviews)
  }

  @Post('/:studioId/publish')
  async publishStudio(
    @Param('studioId') studioId: string,
    @Body('isLive') isLive: boolean,
  ): Promise<StudioDto> {
    const studio = await this.studioService.getStudio(studioId)
    studio.isLive = isLive

    await this.studioService.createOrUpdateStudio(studio)
    return this.studioService.getStudioDto(studioId)
  }

  @Post('/:studioId/:status')
  async approveStudio(
    @Param('studioId') studioId: string,
    @Param('status') status: string,
    @Body('reason') reason: string
  ): Promise<StudioDto> {
    const studio = await this.studioService.getStudio(studioId)
    studio.status = STUDIO_STATUS[status]
    studio.isLive = studio.status === STUDIO_STATUS.APPROVED
    if (status == 'APPROVED') {
      studio.rejected_reason = ""
      const user = await this.userService.getUser(studio.userId)
      const text = `Your \"${studio.name}\" studio was approved`
      await this.UserNotificationService.createNotification(text, user.id, 'studioApproved', studio.id);
    }else if (status == 'PENDING_APPROVAL') {
      studio.rejected_reason = ""
      const user = await this.userService.getUser(studio.userId)
      const text = `The \"${studio.name}\" studio is under review`
      await this.UserNotificationService.createNotification(text, user.id, 'studioPending', studio.id);
      await this.userService.sendPush(user.id, text, "Studio In Review");

    }else if (status == 'REJECTED') {
      studio.rejected_reason = reason
      const user = await this.userService.getUser(studio.userId)
      const text = `Your \"${studio.name}\" studio was rejected: \"${reason}\"`
      await this.UserNotificationService.createNotification(text, user.id, 'studioRejected', studio.id);
      await this.userService.sendPush(user.id, text, "Studio Is Rejected");

    }
    await this.studioService.createOrUpdateStudio(studio)
    return this.studioService.getStudioDto(studioId)
  }

  @Post('/register')
  async registerStudio(@Body() studioReg: StudioRegistrationDto): Promise<StudioDto> {
    this.log.debug('******* studio reg *******')
    this.log.debug(studioReg)
    this.log.debug('******* studio reg *******\n\n')
    const user: User = await this.userService.getUser(studioReg.userId)

    let studio: Studio = {
      user,
      ...studioReg,
      name: studioReg.name,
      description: studioReg.description,
      rejected_reason : studioReg.rejected_reason,
      rules: studioReg.rules,
      price: studioReg.price,
      capacity: studioReg.capacity,
      status: STUDIO_STATUS.PENDING_APPROVAL,
      amenities: studioReg.amenities,
      location: {
        ...studioReg.location,
      },
      isLive: false,
      addOns: studioReg.addOns,
      depositRequired: studioReg.depositRequired,
      minSessionLength: studioReg.minSessionLength
    }

    if (studioReg.studioId) {
      studio = await this.studioService.getStudio(studioReg.studioId)
      studioReg.status = STUDIO_STATUS.PENDING_APPROVAL;
      const toSave = this.mergeWithEntity(studioReg, studio)
      studio = await this.studioService.createOrUpdateStudio(toSave)
      return this.studioService.getStudioDto(studio.id);
    }

    studio = await this.studioService.createOrUpdateStudio(studio);
    return this.studioService.getStudioDto(studio.id);
  }

  @Post('/draft')
  async saveStudioDraft(@Body() studioReg: StudioRegistrationDto): Promise<StudioDto> {
    this.log.log('\n[POST] save studio as draft')
    this.log.log(studioReg)
    this.log.log('[POST] save studio as draft\n')

    // check if we have seen this studio
    let studio: Studio = {
      ...studioReg,
      name: null,
      status: STUDIO_STATUS.DRAFT,
      description: null,
      rejected_reason : null,
      rules: null,
      price: 0,
      capacity: 0,
      isLive: false,
      amenities: [],
      location: null,
      user: null,
      addOns: [],
      depositRequired: false
    }

    if (studioReg.studioId) {
      studio = await this.studioService.getStudio(studioReg.studioId)
      // todo: add special logic to save amenity
    } else {
      studio.user = await this.userService.getUser(studioReg.userId)
    }

    const toSave = this.mergeWithEntity(studioReg, studio)
    const draftedStudio = await this.studioService.createOrUpdateStudio(toSave)
    return this.studioService.transformToDto(draftedStudio)
  }

  @Post(':studioId/users/:userId/flag')
  flagStudio(
    @Param('studioId') studioId: string,
    @Param('userId') userId: string,
    @Body('text') text: string,
  ) {
    this.log.debug(`[flag] studio: ${studioId}, user: ${userId}`)
    return this.studioService.flagStudio(userId, studioId, text)
  }

  @Post('/users/:userId/active')
  async hasActiveStudio(@Param('userId') userId: string) {
    const user = await this.userService.getUser(userId)
    return this.studioService.hasActiveStudio(user)
  }

  mergeWithEntity(studioReg: StudioRegistrationDto, studio: Studio) {
    const keysToUpdate = Object.keys(studioReg)
    const studioKeys = Object.keys(studio)
    for (const key of keysToUpdate) {
      if (studioKeys.includes(key)) {
        studio[key] = studioReg[key]
      }
    }

    return studio
  }
}
