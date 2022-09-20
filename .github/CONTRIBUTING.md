# Contributing to AssistantNMS

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

### TLDR
> **Note:** Please don't file an issue to ask a question. You'll get faster results by asking your question in our [Discord server](https://assistantapps.com/discord) or by using the resources below.

## Table Of Contents

- [Contributing to AssistantNMS](#contributing-to-assistantnms)
    - [TLDR](#tldr)
  - [Table Of Contents](#table-of-contents)
  - [What should I know before I get started?](#what-should-i-know-before-i-get-started)
    - [Project History](#project-history)
    - [Design Decisions](#design-decisions)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [I found a bug and want to report it](#i-found-a-bug-and-want-to-report-it)
    - [Suggesting a Feature](#suggesting-a-feature)

- [Contributing to AssistantNMS](#contributing-to-assistantnms)
    - [TLDR](#tldr)
  - [Table Of Contents](#table-of-contents)
  - [What should I know before I get started?](#what-should-i-know-before-i-get-started)
    - [Project History](#project-history)
    - [Design Decisions](#design-decisions)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [I found a bug and want to report it](#i-found-a-bug-and-want-to-report-it)
    - [Suggesting a Feature](#suggesting-a-feature)

<br />

## What should I know before I get started?

### Project History

The Assistant for No Man's Sky app was started by 1 person and maintained by the same person for over 2 years at the time of writing this. A lot of the code will be opinionated and a lot of the code is old and/or outdated and/or needs refactoring.

The project has gone through multiple major refactorings and still needs to go through a few more. This repo hasn't been my (Khaoz-Topsy) priority, I have mostly focused on the mobile app since it has far more users. 

### Design Decisions

At the time this project was started, a "Container + Presenter" pattern was quite popular. The intention with this pattern was to be able to share logic between multiple "presenters", whether the presenter returns HTML or the ReactNative equivalent. However now that we have React's useState, this pattern can be ignored and we can create simpler components. On that note, there are many Class components in this project, particularly in the "Container" files. In most situations these can be converted to Functional components


<br />

## How Can I Contribute?

### I found a bug and want to report it

First of all thank you for taking the time to check our guidelines before creating a Github issue 💪

To help keep the issues manageable, please double check that the issue you have, has not been reported already in the issues list. Secondly please ensure that you fill in as much information as possible on the issue. The issue template should help you through the process, sometimes small details help us find the bug quickly.

### Suggesting a Feature

_**Please note:** Just because a feature ticket exists, does not mean that we will or can build the feature._ 

- Ensure that there is no existing feature request on the [issues page](https://github.com/AssistantNMS/App/issues)
- Research is required
  - Typically when a feature is built, there is a lot of time spent gathering the data, figuring out how we are going to make use of and store the data within the apps, figuring out how to localise (translate) the data displayed.
- Some things may not be possible or will take too much time.

You can create a feature request from [here](https://github.com/AssistantNMS/App/issues/new?assignees=&labels=idea&template=---feature-request.md)


