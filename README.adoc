// Copyright (c) 2017 IBM Corporation and others.
// Licensed under Creative Commons Attribution-NoDerivatives
// 4.0 International (CC BY-ND 4.0)
//   https://creativecommons.org/licenses/by-nd/4.0/
//
// Contributors:
//     IBM Corporation
:projectid: rest-client-angularjs
:page-layout: guide
:page-duration: 20 minutes
:page-description: Learn how to consume a RESTful web service with AngularJS
:page-releasedate: 2017-11-20
:page-tags: ['REST', 'Client', 'AngularJS']
:page-related-guides: ['rest-intro', 'rest-client-java']
:page-permalink: /guides/{projectid}
:common-includes: https://raw.githubusercontent.com/OpenLiberty/guides-common/master
:source-highlighter: prettify
= Consuming a RESTful web service with AngularJS

Explore how to access a simple RESTful web service and consume its resources with AngularJS in Open
Liberty.

// =================================================================================================
// Introduction
// =================================================================================================

== What you'll learn

You will learn how to access a REST service and deserialize the returned JSON that contains a list of
artists and their albums by using the high-level `$resource` service of AngularJS.

The REST service that provides the artists and albums resource was written for you in advance and
responds with the following JSON:

[source, json, role="no_copy"]
----
include::finish/src/resources/artists.json[]
----

You will implement an AngularJS client that consumes this JSON and displays its contents at the
following URL: http://localhost:9080

To learn more about REST services and how you can write them, see
https://openliberty.io/guides/rest-intro.html[Creating a RESTful web service].


// =================================================================================================
// Getting Started
// =================================================================================================

include::{common-includes}/gitclone.adoc[]


// =================================================================================================
// Starting the service
// =================================================================================================

== Starting the service

Before you begin the implementation, start the provided REST service so that the artist JSON is
available to you.

To start the REST service, run the Maven `install` and `liberty:start-server` goals from the `start`
directory:

[source]
----
mvn clean install
mvn liberty:start-server
----

After you start the server, you can find your artist JSON at the following URL: http://localhost:9080/artists

Any local changes to your JavaScript and HTML are picked up automatically. After you start the Open
Liberty server, you do not need to restart it.


// =================================================================================================
// Guide
// =================================================================================================

== Creating the AngularJS controller

Begin by registering your application module. Every application must contain at least one module, the
application module, which will be bootstrapped to launch the application.

Create `start/src/main/webapp/js/consume-rest.js` and define the application module `consumeRestApp`:

[source, javascript, indent=0]
----
var app = angular.module('consumeRestApp', []);
----

Your application will need some way of communicating with RESTful web services in order to retrieve their resources.
In the case of this guide, your application will need to communicate with the artist service to retrieve the artist JSON.
While there exists a variety of ways of doing this, you can use the fairly straightforward AngularJS
`$resource` service.

To use the `$resource` service, register the `ngResource` module by appending it to your existing code
in `consume-rest.js`:

[source, javascript, indent=0]
----
include::finish/src/main/webapp/js/consume-rest.js[tags=module]
----

By registering another module, you are performing a dependency injection, exposing all functionalities
of that module to your main application module.

Next, define the `Artist` AngularJS service by using the Factory recipe. The Factory recipe
constructs a new service instance with the return value of a passed in function. In this case,
the `$resource` module that you imported earlier is the passed in function. Target the artist JSON
URL in the `$resource()` call.

[source, javascript, indent=0]
----
include::finish/src/main/webapp/js/consume-rest.js[tags=factory]
----

Finally, create a controller and attach the `artist` property to its `$scope` parameter:

[source, javascript, indent=0]
----
include::finish/src/main/webapp/js/consume-rest.js[tags=controller]
----

The controller controls the flow of data in your application. Each controller is instantiated with
its own isolated scope, accessible through the `$scope` parameter. All data that is bound to this
parameter is available in the view to which the controller is attached.

You can now access the `artists` property from the template at the point in the Document Object
Model (DOM) where the controller is registered.


== Creating the AngularJS template

You can find the starting point of your application under `start/src/main/webapp/index.html`.
This file is your template and will contain all elements and attributes specific to AngularJS.

Replace the contents of `start/src/main/webapp/index.html` with the following:

[source, html, indent=0]
----
include::finish/src/main/webapp/index.html[tags=html]
----

Before your application is bootstrapped, you must pull in two AngularJS libraries and import `consume-rest.js`:

[source, html, indent=0]
----
include::finish/src/main/webapp/index.html[tags=head]
----

The first import is the base AngularJS library. The second library is responsible for providing the APIs
for the `$resource` service.

To bootstrap your application, attach the `consumeRestApp` application module to the `body` of your
template:

[source, html, role="no_copy", indent=0]
----
include::finish/src/main/webapp/index.html[tags=body;!controller]
----

Next, attach the `ArtistCtrl` controller to the DOM to create a new child scope. This will make the
`artists` property of the `$scope` object available to access at the point in the DOM where the
controller is attached:

[source, html, role="no_copy", , indent=0]
----
include::finish/src/main/webapp/index.html[tags=body;!repeat]
----

Once the controller is attached, the `artists` property can be data-bounded to the template and accessed
using the `{{ artists }}` expression. You can use the `ng-repeat` directive to iterate over the contents
of the `artists` property:

[source, html, indent=0]
----
include::finish/src/main/webapp/index.html[tags=body]
----

After everything is set up, point your browser to the application root http://localhost:9080 to
see the following output:

[subs="quotes", role="no_copy"]
----
foo wrote 2 albums:
    Album titled *album_one* by *foo* contains *12* tracks
    Album tilted *album_two* by *foo* contains *15* tracks
bar wrote 1 albums:
    Album titled *foo walks into a bar* by *bar* contains *12* tracks
dj wrote 0 albums:
----


== Testing the AngularJS client

No explicit code directly uses the consumed artist JSON, so you do not need to write any test cases for this guide.

Whenever you change your AngularJS implementation, the application root at http://localhost:9080 will
reflect the changes automatically. You can visit the root to manually check whether the artist JSON
was consumed correctly.

Although this guide did not teach you how to build logic, you will likely build logic when you develop your own
applications, and testing will become a crucial part of your development lifecycle. If you need
to write test cases, follow the official unit testing and end-to-end testing documentation on the
AngularJS website: https://docs.angularjs.org/guide/unit-testing.


== Great work! You're done!

You have just accessed a simple RESTful web service and consumed its resources by using AngularJS in
Open Liberty.


include::{common-includes}/finish.adoc[]
