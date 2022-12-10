### Infrastructure

---

- Circleci: used to create a CI/CD pipeline where building, testing, and deploying a project are done using automation. This automation takes place in pipelines with jobs. A pipeline is a set of instructions or steps to be executes each time our code is updated.
- Aws RDS: used to create and host a public postgres database on AWS.
- Aws S3: used to host the frontend side on AWS.
- Aws EB: used to host the backend side on AWS.

### Infrastructure Diagram
```mermaid
flowchart LR
   EndUser -- User goes to the website --> Static_Page_hosted_on_S3 -- Requests Data --> Storefront_APIs_Hosted_on_Elastic_Beanstalk -- Fetches data --> Amazon_RDS_hosting_postgres
   ```
   
   ![Infrastructure Diagram](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/infrastructure-diagram.png)
   
