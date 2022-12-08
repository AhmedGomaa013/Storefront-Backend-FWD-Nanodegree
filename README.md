# Hosting a Storefront Backend Application

---

This project is a simple hosting project for frontend side and backend side with the integration with the database. For hosting the application, there's a CirclCi pipeline to automate building and deploying into Elastic Beanstalk environment and S3 Buckets(AWS Services).
The Project can be accessed through the following [link](http://deploybucket0.s3.us-east-1.amazonaws.com/index.html) where the products of the store will be accessed.

### Project Structure
```
- .circleci: contains the pipeline process.
- server: contains the server side code.
- website: contains the client side code.
```
### App Dependencies

```
- Node v16.18.0.

- AWS CLI v2.

- A RDS database running Postgres.

- A S3 bucket for hosting frontend side.
```
### Pipeline Process

```mermaid
graph TD;
    Install_node --> Setup_aws-cli -->Setup_eb --> Install_server_dependencies --> Build_server --> Build_website --> Deploy_server_to_eb --> Deploy_website_to_s3;
```
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/tree/main)


### AWS Services Diagram
```mermaid
flowchart LR
   EndUser -- User goes to the website --> Static_Page_hosted_on_S3 -- Requests Data --> Storefront_APIs_Hosted_on_Elastic_Beanstalk -- Fetches data --> Amazon_RDS_hosting_postgres

```

### Environment Statuses

- AWS RDS. ![AWS RDS](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/rds.PNG)
- AWS Elastic Beanstalk. ![AWS Elastic Beanstalk](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/eb.PNG)
- AWS Bucket S3. ![AWS Bucket S3](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/s3.PNG)
- CircleCi with Github. ![CircleCi with Github](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/circleci-github.PNG)
- Environment Variables Configurations. ![Environment Variables Configurations](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/config-env-variables.PNG)
