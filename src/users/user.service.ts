import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PaymentService } from '../payment/payment.service';
import { CommunicationService } from '../communication/communication.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import UserNotFoundException from './UserNotFoundException';
import { NotificationPreference } from 'src/communication/notification.preference.entity';
import axios from 'axios';
import { integer } from 'aws-sdk/clients/lightsail';
const stripeTest = require('stripe')(
     'sk_test_51IpFtXBt3PovyCqB7tEHqxxsH6K3OgIqwm2A8TCfYCmk4RGR1GXIMzIKOf3PYdHXdlCgH99NjN1K7UqopENJSyPV00BAV1yJFD'
);
const stripeProd = require('stripe')('sk_test_MEvj1NP7uAlLRMMWukEMnzV5');
const https = require('https');
@Injectable()
export class UserService {
     private log: Logger = new Logger('UserService');
     constructor(
          @InjectRepository(User)
          private readonly userRepository: Repository<User>,
          private commsService: CommunicationService,
          private paymentService: PaymentService
     ) { }

     createOrUpdateUser(userData: User): Promise<User> {
          return this.userRepository.save(userData, { reload: true });
     }

     async getUser(userId: string): Promise<User> {

          const user = await this.userRepository.findOne(userId);
          if (!user) {
               throw new UserNotFoundException();
          }

          return user;
     }

     async deleteUserAcount(id: string) {
          let rese = await this.commsService.deleteNotificationPrefrence(id)
          if (rese) {
               try {
                    var resppppp = {}
                    resppppp["first"] = rese
                    const userDetail = await this.userRepository.findOne({
                         where: { id },
                    });
                    resppppp["uuser"] = userDetail
                    if (!userDetail) {
                         return 'userDetail not found';
                    }
                    let deleted = await this.userRepository.delete(userDetail.id);
                    if (deleted) {
                         resppppp["isDeleted"] = deleted
                    } else {
                         resppppp["isDeleted"] = false
                    }
                    resppppp["messagge"] = 'ok data found successflyy!'
                    return resppppp;
               } catch (e) {
                    return e;
               }

          } else {
               return "we are mot able to delete!";
          }

     }

     getAll() {
          return this.userRepository.find();
     }

     async getByLoginInfo(email: string, password: string): Promise<User> {
          const user = await this.userRepository.findOne({
               where: { email },
          });

          if (!user) {
               throw new UserNotFoundException();
          }

          const isSamePassword = await bcrypt.compare(password, user.password);
          if (!isSamePassword) {
               throw new UserNotFoundException();
          }
          return user;
     }

     async registerUser(user: User): Promise<User> {
          const createdUser = await this.createOrUpdateUser(user);
          await this.commsService.createDefaultNotificationPreferences(
               createdUser
          );
          await this.paymentService.create(user);
          return createdUser;
     }

     async registerSocialUser(user: User): Promise<User> {
          const createdUser = await this.createOrUpdateUser(user);
          await this.commsService.createDefaultNotificationPreferences(
               createdUser
          );
          // await this.paymentService.create(user)
          return createdUser;
     }

     // async tempPaymentDataPatch() {
     //   const users = await this.userRepository.find()
     //   for (const user of users) {
     //     await this.paymentService.create(user)
     //   }
     // }

     async getUserFromEmail(email: string): Promise<User> {
          const user = await this.userRepository.findOne({
               where: { email },
          });
          if (!user) {
               throw new UserNotFoundException();
          }
          return user;
     }

     async createCustomAccountForUser(data): Promise<{ id: string }> {
          try {
               const account = await stripeTest.accounts.create({
                    country: 'US',
                    type: 'custom',
                    email: data.email,
                    business_type: 'individual',
                    tos_acceptance: {
                         date: 1609798905,
                         ip: '0.0.0.0'
                    },
                    business_profile: {
                         url: 'soimething.com'
                    },
                    individual: {

                         first_name: data.firstName,
                         last_name: data.lastName,
                         ssn_last_4: 1234,
                         dob: {
                              day: 2,
                              month: 4,
                              year: 1998
                         },

                    },
                    capabilities: {
                         //card_payments: { requested: true },
                         transfers: { requested: true },
                    },
               });
               return account;
          } catch (err) {
               if (err.message) {
                    throw err.message;
               }
               throw err;
          }
     }

     // async sendPush(userID : string, message : string , title : string ) {
     //     try{
     //      var data = {
     //           "app_id" : "875fa3ce-631c-45d1-aea5-bb8f559316f2",
     //           "contents": {"en":message},
     //           "included_segments":["All"]     
     //      }
     //      const res = await axios.post('https://onesignal.com/api/v1/notifications', data, {
     //                headers: {
     //                'content-type': 'application/json',
     //                'Authorization' : 'Basic ZmQxMTE2ZjctMjEzOC00YWYyLWI5MzItMGNmMmJiNDhlZjk1',
     //                'accept': 'application/json'
     //                }
     //       }      
     //      );
     //      return res.data 
     //     }catch(e){
     //      return {"error":e, "Message": "Not able to send"}
     //     }
     // }

     async sendPush(userID: string, message: string, title: string, appt_id?: string) {
          var data = {
               "app_id": "ccd5c591-07b7-475d-9dd2-8a9d0139a781",
               "contents": { "en": message },
               "headings": { "en": title },
               'include_external_user_ids': [userID],
               "included_segments": ["Subscribed Users"],
          }
          if (appt_id) {
               data['data'] = appt_id;
          }
          const postData = JSON.stringify(data);
          const options = {
               hostname: 'onesignal.com',
               path: '/api/v1/notifications',
               method: 'POST',
               headers: {
                    'Authorization': 'Basic YzU4MDBjMDUtZGJmNy00ZDRmLTgzNzgtYzZiM2IyMmMyN2E1',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    'Accept': 'application/json'
               }
          };

          const req = https.request(options, (res) => {
               console.log(`statusCode: ${res.statusCode}`);
               res.on('data', (d) => {
                    process.stdout.write(d);
               });
               return res;
          });

          req.on('error', (error) => {
               console.error(error);
               return error
          });

          req.write(postData);
          req.end();
     }
}
