# Hosting a Storefront Backend Application

---

This project is a simple hosting project for frontend side and backend side with the integration with the database. For hosting the application, there's a CirclCi pipeline to automate building and deploying into Elastic Beanstalk environment and S3 Buckets(AWS Services).
The Project can be accessed through the following [link](http://deploybucket0.s3.us-east-1.amazonaws.com/index.html) where the products of the store will be accessed.

### Project Structure
```
- .circleci: contains the pipeline process.
- server: contains the server side code.
- website: contains the client side code.
- envirnment-status: contains images for envirnment status for different aws services.
```

### Environment Statuses

- AWS RDS. ![AWS RDS](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/rds.PNG)
- AWS Elastic Beanstalk. ![AWS Elastic Beanstalk](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/eb.PNG)
- AWS Bucket S3. ![AWS Bucket S3](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/s3.PNG)
- CircleCi with Github. ![CircleCi with Github](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/circleci-github.PNG)
- Environment Variables Configurations. ![Environment Variables Configurations](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/config-env-variables.PNG)
