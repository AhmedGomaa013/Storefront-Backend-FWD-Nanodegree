### Pipeline Process
---
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/tree/main)

![Pipeline Diagram](https://github.com/AhmedGomaa013/Storefront-Backend-FWD-Nanodegree/blob/main/environment-status/pipeline-diagram.png)

```mermaid
graph TD;
    Fix_a_bug --> Commit_code_changes;
    Add_a_feature --> Commit_code_changes;
    Commit_code_changes --> Push_Code --> Merge_To_main_branch --> CirclrCi_gets_triggered --> Start_build-deploy_job --> Install_node;
    Install_node --> Setup_aws-cli --> Setup_eb --> Install_server_dependencies --> Build_server --> Build_website --> Deploy_server_to_eb --> Deploy_website_to_s3;
```

