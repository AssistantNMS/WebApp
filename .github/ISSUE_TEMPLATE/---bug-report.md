---
name: "\U0001F41B Bug report"
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''

body:
  - type: textarea
    id: describe-bug
    attributes:
      label: Describe the bug?
      description: A clear and concise description of what the bug is. If you for example disagree with what the name of an game item is please point out what you believe it should say.
      placeholder: Tell us what you saw!
      value: ""
    validations:
      required: true
  - type: textarea
    id: steps-to-reproduce
    attributes:
      label: Steps To Reproduce
      description: Steps to reproduce the behavior:
      placeholder: Tell us how to make the bug happen again!
      value: "
1. Go to 'Bone Cream' item page
2. Click on add to cart button
3. Give a quantity
4. It fails to add to cart"
    validations:
      required: true

---

<!--
Thank you for reporting issues!
Please make sure that you have looked at and read the "I found a Bug and I want to report it" section of the Contributing to AssistantNMS document: https://github.com/AssistantNMS/App/blob/main/.github/CONTRIBUTING.md
-->

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Additional context**
Add any other context about the problem here.
