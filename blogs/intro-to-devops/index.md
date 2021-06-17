---
title: "An introduction to the theory of DevOps — why, when and how?"
date: "January 25, 2021"
category: "DevOps"
tech: "NGINX, Apache"
featuredImg: "/intro-to-devops/cover.jpg"
---

![Image](/intro-to-devops/cover.jpg)

## What is blue-green deployment?

The strategy gets its name from the idea of having two concurrent environments, and switching between environments. The environments have different code revision signatures.

The **blue** environment is the old environment.
The **green** environment is the newer and more updated environment.

Since the deployment process changes the _web pointers_ from the blue environment to the green environment, it is known as the **Blue-Green** deployment strategy.

Of the many benefits provided by the blue-green deployment strategy, the most important few are:

### 1. Software & service downtime reduction

If production deployments relied on a single environment, there would _definitely_ be server downtime, owing to the time cost of source code updates and patches. However, if there are two environments running concurrently, this downtime gets reduced to nil given there occurs no mid-modification issues.

### 2. Experimental feature testing

When new features need to tested publicly, this strategy offers significant advantages. Since the idea of this strategy involves having 2 environments, a small portion of the users can be exposed to one of the environments with the experimental features. Depending on the response of the users, devs can take further decisions about the impact of the new features, change the ratio of exposure or totally upgrade to the new version.

### 3. Isolation for testing and production environments

One of the better uses of blue-green deployment strategy is keeping the development and production environments separated from each other. Devs should never have to worry about writing new code or changing infrastructure which will directly impact the live servers. This will only cause public frustration..

_..something which can easily turn into memes_

### 4. Crashes and rollbacks

One of the more common and _mostly frightening_ term for any software company on earth would be **crash**. But even though, code has been tested hundred of times before release, there might be times when a few bugs may jump out of the bucket. Critical ones. Having a blue-green deployment technique can be a life-saver during these cases, as teams can switch back to the stable older environment where those bugs are not encountered, thus giving them freedom and salvation from the torment of the public and media as they sit down to fix the bugs and redeploy again. If some different deployment technique (_in-place deployment_) was used instead, rollbacks would become very lengthy as there would be **_no older environment to switch back to_**.

In the industry of cloud and web tech, **blue-green** or **_canary_** deployment are still one of the main and most popular deployment strategies that is used to upgrade running servers with the latest production code. Every big software company (Facebook, Google, Amazon, and so on..) has used or is still using this strategy for their deployments because of the conveniences it provides.

However, a downside to this strategy is that, as the switching of the environments are handled by the _load-balancers_, a switching time-delay due to DNS propagation occurs. DNS servers are updated with the correct server DNS names(their unique address on the web) via propagation, which means, it takes time to reach every domain name server across the planet. As a result, people of some regions of the world may not be able to access the changes in the servers as soon as the deployment happens, _because the DNS servers closest to them are still pointing to the_ **_older servers._** Sometimes, when a new deployment has taken place with bugs in the code, a rollback although issued instantly will not be perceived in every part of the world. _So people will still be looking at the buggy version of the software even though the buggy version has been correctly roll backed from._

Although these can occur, proper trial and testing can help resolve these problems before they are released to the open world. Compared to the bigger pool of advantages, these problems are easily overlooked and are the reason why blue-green deployment strategies are still preferred today.
