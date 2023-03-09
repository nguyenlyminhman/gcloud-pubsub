import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable({scope:Scope.REQUEST})
export class MongooseTenantConfigService implements MongooseOptionsFactory {
    constructor(@Inject(REQUEST) private readonly request,){}

  createMongooseOptions(): MongooseModuleOptions {
    // let domain:string[]
    let database='database_development'
    // console.log(this.request['headers']['x-tenant-id'])
    // if(this.request.data ){
    //   domain=this.request.data['host'].split('.')
    //   console.log(this.request)
    // }
    // else{
    //   domain=this.request['headers']['host'].split('.')
    // }
    // if(domain[0]!='127' && domain[0]!='www' && domain.length >0){
    //   database='tenant_'+domain[0]
    // }
    if(this.request['headers']['x-tenant-id'] === undefined)
      return;
    database = 'tenant_'+this.request['headers']['x-tenant-id']
    return {
      uri: 'mongodb://mongoadmin:secret@localhost:27017/'+database+'?authSource=admin',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        minPoolSize: 1,
        maxPoolSize: 2
    };
  }
}