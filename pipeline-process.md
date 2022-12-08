### Pipeline Process
---

```mermaid
graph TD;
    Install_node --> Setup_aws-cli -->Setup_eb --> Install_server_dependencies --> Build_server --> Build_website --> Deploy_server_to_eb --> Deploy_website_to_s3;
```
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/tree/main)