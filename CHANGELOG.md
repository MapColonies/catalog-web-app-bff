# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.5](https://github.com/MapColonies/catalog-web-app-bff/compare/v4.0.4...v4.0.5) (2026-04-08)


### Bug Fixes

* return in search query also info about the csw request ([#280](https://github.com/MapColonies/catalog-web-app-bff/issues/280)) ([d40cec7](https://github.com/MapColonies/catalog-web-app-bff/commit/d40cec7251e627cd164e7afd79dee84a352cf733))

## [4.0.4](https://github.com/MapColonies/catalog-web-app-bff/compare/v4.0.3...v4.0.4) (2026-03-19)


### Bug Fixes

* artifacts.json in build-and-push.yaml ([#286](https://github.com/MapColonies/catalog-web-app-bff/issues/286)) ([1a30a35](https://github.com/MapColonies/catalog-web-app-bff/commit/1a30a35f2ec95ef5b2a989b49b8e394d6e52915a))

## [4.0.3](https://github.com/MapColonies/catalog-web-app-bff/compare/v4.0.2...v4.0.3) (2026-03-19)


### Bug Fixes

* sync callback response type with raster-shared ([#284](https://github.com/MapColonies/catalog-web-app-bff/issues/284)) ([7d387e8](https://github.com/MapColonies/catalog-web-app-bff/commit/7d387e8ef2a662473c349f273092bb3dcdf42076))

## [4.0.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v4.0.1...v4.0.2) (2026-03-18)


### Bug Fixes

* integer http status is missing from errors log ([#282](https://github.com/MapColonies/catalog-web-app-bff/issues/282)) ([a9f4455](https://github.com/MapColonies/catalog-web-app-bff/commit/a9f445586c9d412d49403df8ead99e26c64dde5e))

## [4.0.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v4.0.0...v4.0.1) (2026-03-18)


### Bug Fixes

* liveness ([#277](https://github.com/MapColonies/catalog-web-app-bff/issues/277)) ([6cf3224](https://github.com/MapColonies/catalog-web-app-bff/commit/6cf32247f7128188bc960fe18ab0d351688305a2))
* logger ([#279](https://github.com/MapColonies/catalog-web-app-bff/issues/279)) ([1c21cfc](https://github.com/MapColonies/catalog-web-app-bff/commit/1c21cfc6ed42a3d440a68c36ea2274fb700b8d7c))

## [4.0.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v3.0.0...v4.0.0) (2026-02-24)


### ⚠ BREAKING CHANGES

* Ingest related api synch ( MAPCO-8421 ) ([#216](https://github.com/MapColonies/catalog-web-app-bff/issues/216))
* new raster ingestion api sync ( MAPCO-8421 ) ([#210](https://github.com/MapColonies/catalog-web-app-bff/issues/210))

### Features

* 3D profile 2.0 ([#103](https://github.com/MapColonies/catalog-web-app-bff/issues/103)) ([fa24b25](https://github.com/MapColonies/catalog-web-app-bff/commit/fa24b2533b4a6fde1dc5bf1688218106bd1acb0a))
* ability to define service exposure ([#143](https://github.com/MapColonies/catalog-web-app-bff/issues/143)) ([a38d7a2](https://github.com/MapColonies/catalog-web-app-bff/commit/a38d7a24e951478585ee21bb69e08575e3e108a9))
* add custom tables request for lookup tables resolver ([#138](https://github.com/MapColonies/catalog-web-app-bff/issues/138)) ([ec16a3c](https://github.com/MapColonies/catalog-web-app-bff/commit/ec16a3cfc05ff276ed5ef1cef037d9f56515ef5f))
* add fields in job search input type for date range ([#74](https://github.com/MapColonies/catalog-web-app-bff/issues/74)) ([66f452d](https://github.com/MapColonies/catalog-web-app-bff/commit/66f452d9ffb4d2e8291d53b054b969b17109ac5a))
* add graphql implementation ([#1](https://github.com/MapColonies/catalog-web-app-bff/issues/1)) ([ffa637e](https://github.com/MapColonies/catalog-web-app-bff/commit/ffa637e30e1003c03f76ac5849075cdb6f4d3e10))
* add new job status called 'Suspended' ([#178](https://github.com/MapColonies/catalog-web-app-bff/issues/178)) ([979c04b](https://github.com/MapColonies/catalog-web-app-bff/commit/979c04b4609a7812786fbf9cf425c15f65fa95cc))
* add new validation for resolutionDegree ([#177](https://github.com/MapColonies/catalog-web-app-bff/issues/177)) ([b989c32](https://github.com/MapColonies/catalog-web-app-bff/commit/b989c32d6c93afcc5fe46f97577564ba0b33aa73))
* add parser implementation and csw client integration ([#2](https://github.com/MapColonies/catalog-web-app-bff/issues/2)) ([9370305](https://github.com/MapColonies/catalog-web-app-bff/commit/93703059b021a1052811bc56f015be9354623251))
* added dem heights service (MAPCO-3364) ([#145](https://github.com/MapColonies/catalog-web-app-bff/issues/145)) ([aa23e78](https://github.com/MapColonies/catalog-web-app-bff/commit/aa23e7813f1777da5a8739491b0f6ced399fb159))
* added job retry service ([3a59060](https://github.com/MapColonies/catalog-web-app-bff/commit/3a59060629bde1faf008e3dfd6d3af9ce72e2f40))
* added job retry service ([#55](https://github.com/MapColonies/catalog-web-app-bff/issues/55)) ([53268fb](https://github.com/MapColonies/catalog-web-app-bff/commit/53268fb3e1f62a6495086d3bfedbd46c0fcf22d7))
* added rows option to field config and implement for description fields ([54c22c6](https://github.com/MapColonies/catalog-web-app-bff/commit/54c22c6ec9b5a398491d9f23e13b2d23b1958779))
* added rows option to field config and implement for description fields ([#101](https://github.com/MapColonies/catalog-web-app-bff/issues/101)) ([43d04e4](https://github.com/MapColonies/catalog-web-app-bff/commit/43d04e401ef720694830f5e5af92d0c3ef86453f))
* best entity and descriptor ([#16](https://github.com/MapColonies/catalog-web-app-bff/issues/16)) ([5dbe73f](https://github.com/MapColonies/catalog-web-app-bff/commit/5dbe73f47591aa6b07a92a77cab6cbe5a1762306))
* bff services availability (MAPCO-3354) ([#144](https://github.com/MapColonies/catalog-web-app-bff/issues/144)) ([964d099](https://github.com/MapColonies/catalog-web-app-bff/commit/964d0993e8e07a5f6470f0d194391cfa49621b43))
* bump version ([#18](https://github.com/MapColonies/catalog-web-app-bff/issues/18)) ([052a162](https://github.com/MapColonies/catalog-web-app-bff/commit/052a1629e5537bf264053687270917b5beb7c74e))
* csw access token ([#67](https://github.com/MapColonies/catalog-web-app-bff/issues/67)) ([0005f4a](https://github.com/MapColonies/catalog-web-app-bff/commit/0005f4a312604f8150d06cffc3cd9ace7549890c))
* domain job action with job type ([#271](https://github.com/MapColonies/catalog-web-app-bff/issues/271)) ([90ba999](https://github.com/MapColonies/catalog-web-app-bff/commit/90ba9995efca9bb27fc076a5870932544b1fbedb))
* entity descriptor holds fields ui aspects and translations ([#6](https://github.com/MapColonies/catalog-web-app-bff/issues/6)) ([9a189a2](https://github.com/MapColonies/catalog-web-app-bff/commit/9a189a23b31fb227fe6001c39caf41819a816f1d))
* external services config  implementation ([#73](https://github.com/MapColonies/catalog-web-app-bff/issues/73)) ([feaa61b](https://github.com/MapColonies/catalog-web-app-bff/commit/feaa61b936ee8f5b14c4bdfd04d194dad78ac848))
* **filter:** support filter by bbox ([#3](https://github.com/MapColonies/catalog-web-app-bff/issues/3)) ([3bbc2fb](https://github.com/MapColonies/catalog-web-app-bff/commit/3bbc2fb797a3d67b53b835a3073997e2cfeb900f))
* find tasks (MAPCO-8436) ([#214](https://github.com/MapColonies/catalog-web-app-bff/issues/214)) ([d1a961c](https://github.com/MapColonies/catalog-web-app-bff/commit/d1a961cf3be12f647265386fe7603939905e8f01))
* fix producer name ([#17](https://github.com/MapColonies/catalog-web-app-bff/issues/17)) ([7c679b2](https://github.com/MapColonies/catalog-web-app-bff/commit/7c679b2190ea82dccc4b5563088521527615d8c8))
* get records by id ([#19](https://github.com/MapColonies/catalog-web-app-bff/issues/19)) ([7f62293](https://github.com/MapColonies/catalog-web-app-bff/commit/7f62293ca06f5ae32bbd9d288a4adfb4180e4553))
* Ingest related api synch ( MAPCO-8421 ) ([#216](https://github.com/MapColonies/catalog-web-app-bff/issues/216)) ([f340f47](https://github.com/MapColonies/catalog-web-app-bff/commit/f340f471d324e74816cd48ba9210a29639f633f2))
* ingestion manager ([#9](https://github.com/MapColonies/catalog-web-app-bff/issues/9)) ([eda46d8](https://github.com/MapColonies/catalog-web-app-bff/commit/eda46d878c6281e5c2f278cb15682c0bd3a7e130))
* integration with 3D ([#15](https://github.com/MapColonies/catalog-web-app-bff/issues/15)) ([d10c19d](https://github.com/MapColonies/catalog-web-app-bff/commit/d10c19d6d878c1db677b2b17a1ed80a2af9966b3))
* jobs manager ([#14](https://github.com/MapColonies/catalog-web-app-bff/issues/14)) ([a0c7f2f](https://github.com/MapColonies/catalog-web-app-bff/commit/a0c7f2f32761202b7f12882ea267a722f1c852ea))
* login ( MAPCO-3936 ) ([#160](https://github.com/MapColonies/catalog-web-app-bff/issues/160)) ([48c0086](https://github.com/MapColonies/catalog-web-app-bff/commit/48c0086c486c6dd5b897b610dcae05ad30bf52e3))
* mc-models 3DRecord changes ([#93](https://github.com/MapColonies/catalog-web-app-bff/issues/93)) ([4ec1b1e](https://github.com/MapColonies/catalog-web-app-bff/commit/4ec1b1e8c755298b04ff9cc0f04b6289a01d6623))
* new dem profile sync and update ui aspects and fields ([#141](https://github.com/MapColonies/catalog-web-app-bff/issues/141)) ([e8f9103](https://github.com/MapColonies/catalog-web-app-bff/commit/e8f9103a8a81e76ceeec7b9450b8da0c8d1b5290))
* New Job Manager for Raster (MAPCO: 8438) ([#230](https://github.com/MapColonies/catalog-web-app-bff/issues/230)) ([6c3f32e](https://github.com/MapColonies/catalog-web-app-bff/commit/6c3f32e4b66569b0b1fa24420966f36f7ed6fd07))
* new query - get product ([#164](https://github.com/MapColonies/catalog-web-app-bff/issues/164)) ([c4b771d](https://github.com/MapColonies/catalog-web-app-bff/commit/c4b771d95478e4663857f0b6cfca0f4c02d41aeb))
* new raster ingestion api sync ( MAPCO-8421 ) ([#210](https://github.com/MapColonies/catalog-web-app-bff/issues/210)) ([4385a60](https://github.com/MapColonies/catalog-web-app-bff/commit/4385a603f4c1ca3a637414183f05461992787112))
* new ui aspects option for update entity ([#89](https://github.com/MapColonies/catalog-web-app-bff/issues/89)) ([8273e2e](https://github.com/MapColonies/catalog-web-app-bff/commit/8273e2ec26098a08622341e1cf4546b145c1fecd))
* quantized mesh best ([#86](https://github.com/MapColonies/catalog-web-app-bff/issues/86)) ([1a88ab2](https://github.com/MapColonies/catalog-web-app-bff/commit/1a88ab2afdc4fa4289279fd77dcc06e07906bf9d))
* raster file selection by file type[shp, gpkg] ( MAPCO-8627 ) ([#209](https://github.com/MapColonies/catalog-web-app-bff/issues/209)) ([1b0e74f](https://github.com/MapColonies/catalog-web-app-bff/commit/1b0e74fb0d3a6140d6585c321accff1952a3fb4e))
* raster product status publish unpublish ([#187](https://github.com/MapColonies/catalog-web-app-bff/issues/187)) ([4e5631a](https://github.com/MapColonies/catalog-web-app-bff/commit/4e5631a53f42c7368e5ca214dcb59faf5ffdad5b))
* resolution as custom lookup-table (zoomlevelresolutions) ( MAPCO-3631 ) ([#154](https://github.com/MapColonies/catalog-web-app-bff/issues/154)) ([2d62329](https://github.com/MapColonies/catalog-web-app-bff/commit/2d623296763838e31e76bf120362512609d45678))
* resolve raw enums for client base concept ([#107](https://github.com/MapColonies/catalog-web-app-bff/issues/107)) ([9e44912](https://github.com/MapColonies/catalog-web-app-bff/commit/9e449126539a54ede8063f50d673d252457b1df4))
* served entity types ([#23](https://github.com/MapColonies/catalog-web-app-bff/issues/23)) ([dd28186](https://github.com/MapColonies/catalog-web-app-bff/commit/dd281867ac7eaf40d62d1b83da10fd8195f7c0c6))
* service discovery implementation ([#72](https://github.com/MapColonies/catalog-web-app-bff/issues/72)) ([af21aa6](https://github.com/MapColonies/catalog-web-app-bff/commit/af21aa61bc9352e705a90ed6e004c03b6b8f62b3))
* split source info queries ([#208](https://github.com/MapColonies/catalog-web-app-bff/issues/208)) ([4ecc1e1](https://github.com/MapColonies/catalog-web-app-bff/commit/4ecc1e1e0ebb296cb4bcebb8d223dd4de7fc0550))
* start implementing wfs client ([#128](https://github.com/MapColonies/catalog-web-app-bff/issues/128)) ([81bfdfa](https://github.com/MapColonies/catalog-web-app-bff/commit/81bfdfa1a33603765521e0564c7018a1f0c7116e))
* support shapefile providers ([#180](https://github.com/MapColonies/catalog-web-app-bff/issues/180)) ([572fa20](https://github.com/MapColonies/catalog-web-app-bff/commit/572fa20fd6eb6d1e3dfc44ef0f2ac9e9b02baff5))
* support wfs pagination ([#184](https://github.com/MapColonies/catalog-web-app-bff/issues/184)) ([b25d53e](https://github.com/MapColonies/catalog-web-app-bff/commit/b25d53e8cc9507121ed7517045be73a88c2494db))
* tasks notifications web socket (MAPCO-8444) ([#233](https://github.com/MapColonies/catalog-web-app-bff/issues/233)) ([44660e0](https://github.com/MapColonies/catalog-web-app-bff/commit/44660e01bc2ab23ba1f86451e1df03ce607ad6a8))
* transparency field added to model ([#130](https://github.com/MapColonies/catalog-web-app-bff/issues/130)) ([6cbdf19](https://github.com/MapColonies/catalog-web-app-bff/commit/6cbdf19d6224fc2ef0d6a7e96649f85f2ba45374))
* ui aspects ([#13](https://github.com/MapColonies/catalog-web-app-bff/issues/13)) ([8fb9b7e](https://github.com/MapColonies/catalog-web-app-bff/commit/8fb9b7ed7d352a8ce8c1a8037961077bc961c28e))
* updated job model and mock data ([#38](https://github.com/MapColonies/catalog-web-app-bff/issues/38)) ([373df1f](https://github.com/MapColonies/catalog-web-app-bff/commit/373df1fb28b270b369677be33ed8961a08783981))
* upgrade to node v24 ([#275](https://github.com/MapColonies/catalog-web-app-bff/issues/275)) ([e8483cf](https://github.com/MapColonies/catalog-web-app-bff/commit/e8483cfe77ccd6308a4d7d92170cd52acf9959d0))
* use helm common ([#166](https://github.com/MapColonies/catalog-web-app-bff/issues/166)) ([0a5ad1b](https://github.com/MapColonies/catalog-web-app-bff/commit/0a5ad1bd92e7d3d65ec917db4cf3fb7318f21f1b))
* values schema integration ([#167](https://github.com/MapColonies/catalog-web-app-bff/issues/167)) ([7c43963](https://github.com/MapColonies/catalog-web-app-bff/commit/7c439630a0e41b6b0bbf89fcab304142769442dc))
* vector catalog ([#185](https://github.com/MapColonies/catalog-web-app-bff/issues/185)) ([931197e](https://github.com/MapColonies/catalog-web-app-bff/commit/931197e0c73a5ddbcdc52d8de9ce94affb0753b5))
* vector raster best entity ([#56](https://github.com/MapColonies/catalog-web-app-bff/issues/56)) ([c2aa162](https://github.com/MapColonies/catalog-web-app-bff/commit/c2aa162162b9f3d67a0f37039de44a4c4e99d98a))


### Bug Fixes

* 3d ([#35](https://github.com/MapColonies/catalog-web-app-bff/issues/35)) ([dbb3af8](https://github.com/MapColonies/catalog-web-app-bff/commit/dbb3af868c9837b5aa64180ade82938bebdf0845))
* 3d ([#40](https://github.com/MapColonies/catalog-web-app-bff/issues/40)) ([690cad8](https://github.com/MapColonies/catalog-web-app-bff/commit/690cad88d95bc7eb36ec1d831571f4c1c3f5c8bd))
* 3d csw service as route ([#159](https://github.com/MapColonies/catalog-web-app-bff/issues/159)) ([fe914af](https://github.com/MapColonies/catalog-web-app-bff/commit/fe914af33af7f71cf81ae2efcb5d109814967490))
* 3d exception ([#88](https://github.com/MapColonies/catalog-web-app-bff/issues/88)) ([6338093](https://github.com/MapColonies/catalog-web-app-bff/commit/633809381d7314a8cd182e2ff61ffb076043b289))
* 3d update integration ([#97](https://github.com/MapColonies/catalog-web-app-bff/issues/97)) ([5b0cb08](https://github.com/MapColonies/catalog-web-app-bff/commit/5b0cb087a269cf5b25cbce6fd4eacdd5a7f93ff8))
* abort ([#273](https://github.com/MapColonies/catalog-web-app-bff/issues/273)) ([48af821](https://github.com/MapColonies/catalog-web-app-bff/commit/48af821ba8fff918b4098244177c8a2422ab683a))
* abort job status support + disable job actions ([#108](https://github.com/MapColonies/catalog-web-app-bff/issues/108)) ([e1c262c](https://github.com/MapColonies/catalog-web-app-bff/commit/e1c262c484bef60c3437e5ba67ea81ab5a085f99))
* add insert date to records metadata ([#122](https://github.com/MapColonies/catalog-web-app-bff/issues/122)) ([8fb8c1a](https://github.com/MapColonies/catalog-web-app-bff/commit/8fb8c1a341e18ce835e75fc902465f9ebd490a52))
* add lookup table service value ([#135](https://github.com/MapColonies/catalog-web-app-bff/issues/135)) ([ce3c6e6](https://github.com/MapColonies/catalog-web-app-bff/commit/ce3c6e6d049ad1e021a6e9fdb5bd345a5b6e9be5))
* add RasterJobTypeEnum ([#232](https://github.com/MapColonies/catalog-web-app-bff/issues/232)) ([213b883](https://github.com/MapColonies/catalog-web-app-bff/commit/213b883a6a142eca5979fb34509b46678d01d35d))
* add unsafe prem to allow patching ([#5](https://github.com/MapColonies/catalog-web-app-bff/issues/5)) ([8bcaf0c](https://github.com/MapColonies/catalog-web-app-bff/commit/8bcaf0cb5f9974e36a11efdcbb5ac450a9642014))
* add version date to search results info tooltip ([#156](https://github.com/MapColonies/catalog-web-app-bff/issues/156)) ([90c85fe](https://github.com/MapColonies/catalog-web-app-bff/commit/90c85feac3c8b1248c66ce7572bc14a33415d794))
* added region to transform entity ([#81](https://github.com/MapColonies/catalog-web-app-bff/issues/81)) ([df3eff8](https://github.com/MapColonies/catalog-web-app-bff/commit/df3eff8b9c9bf4f7809c6ad63df5eacb8415dc1e))
* all dates granularities should be set to minutes MAPCO-2637 ([#119](https://github.com/MapColonies/catalog-web-app-bff/issues/119)) ([c116ce8](https://github.com/MapColonies/catalog-web-app-bff/commit/c116ce8f6296a81ba8c6557af7fd2303b25cd38c))
* autogenerated null fields sent to ingestion ([35c340e](https://github.com/MapColonies/catalog-web-app-bff/commit/35c340e1417b4731f8dff30dacb4a3f822ea5bd4))
* axios default retry mechanism ([#162](https://github.com/MapColonies/catalog-web-app-bff/issues/162)) ([bc7103a](https://github.com/MapColonies/catalog-web-app-bff/commit/bc7103a87e234b352fe5682231f8425990d0b0fa))
* axios limit ([#182](https://github.com/MapColonies/catalog-web-app-bff/issues/182)) ([18f2cc0](https://github.com/MapColonies/catalog-web-app-bff/commit/18f2cc034314cb170508230d03c44296b0369a36))
* best related fields typing ([#21](https://github.com/MapColonies/catalog-web-app-bff/issues/21)) ([bb41b6a](https://github.com/MapColonies/catalog-web-app-bff/commit/bb41b6aab3a0ae2fcb8128ff72be81e7ddfc9ff6))
* bff ([#265](https://github.com/MapColonies/catalog-web-app-bff/issues/265)) ([5346380](https://github.com/MapColonies/catalog-web-app-bff/commit/53463809858f05148c1596c968bf452bfad991c1))
* bff api cors and logging ([#217](https://github.com/MapColonies/catalog-web-app-bff/issues/217)) ([19156c9](https://github.com/MapColonies/catalog-web-app-bff/commit/19156c999fa809d8d8f4eb9cbebece090b32613a))
* brief panel ([#152](https://github.com/MapColonies/catalog-web-app-bff/issues/152)) ([5b8b49e](https://github.com/MapColonies/catalog-web-app-bff/commit/5b8b49ef03036de08fbdca5186c03a718faded8d))
* bug, change raster and pp ui-aspects from sourceDate to imagingTime ([#171](https://github.com/MapColonies/catalog-web-app-bff/issues/171)) ([dcf7882](https://github.com/MapColonies/catalog-web-app-bff/commit/dcf7882248fa49cfeb98d778d6b38b0f7128bd96))
* bump docker node and helm openapi bumpers ([#169](https://github.com/MapColonies/catalog-web-app-bff/issues/169)) ([2e51d64](https://github.com/MapColonies/catalog-web-app-bff/commit/2e51d64abfda74e1192eaf6bd69d1d03bbbbd36b))
* bump mc-models ([#31](https://github.com/MapColonies/catalog-web-app-bff/issues/31)) ([a324ed7](https://github.com/MapColonies/catalog-web-app-bff/commit/a324ed76f6438eb639bddfee9e02b2873e11b6f6))
* c for each error ([#131](https://github.com/MapColonies/catalog-web-app-bff/issues/131)) ([fb42aa4](https://github.com/MapColonies/catalog-web-app-bff/commit/fb42aa4da7934ff18b1351d222e7e553d10f3e50))
* callback urls (MAPCO-8444) ([#236](https://github.com/MapColonies/catalog-web-app-bff/issues/236)) ([95994af](https://github.com/MapColonies/catalog-web-app-bff/commit/95994afcde6051923f0e7cf6f2a93be77c677c81))
* capabilities ([#84](https://github.com/MapColonies/catalog-web-app-bff/issues/84)) ([b9f3b1f](https://github.com/MapColonies/catalog-web-app-bff/commit/b9f3b1f72c31697ddeeb25e160ae1415db69bdd6))
* change sourceId to be nullable in pp record input ([#173](https://github.com/MapColonies/catalog-web-app-bff/issues/173)) ([4471183](https://github.com/MapColonies/catalog-web-app-bff/commit/44711834efb08babdc0d9bd98fd1fd5cf5302d61))
* chart.yaml bump version ([fd4e8ae](https://github.com/MapColonies/catalog-web-app-bff/commit/fd4e8ae8f01e4d584559925a4cc7d1891486d352))
* clean metadata for raster ingest ([#36](https://github.com/MapColonies/catalog-web-app-bff/issues/36)) ([466ffaa](https://github.com/MapColonies/catalog-web-app-bff/commit/466ffaa04ba1bb05ab756d1e9b1d7f9f4a5f74f5))
* condition of target name in raster SE ([#212](https://github.com/MapColonies/catalog-web-app-bff/issues/212)) ([bf6c87e](https://github.com/MapColonies/catalog-web-app-bff/commit/bf6c87e4db2c635b37ac8d44fb5ad1f163c280d1))
* correct job abort api path ([#267](https://github.com/MapColonies/catalog-web-app-bff/issues/267)) ([f3698fc](https://github.com/MapColonies/catalog-web-app-bff/commit/f3698fc678533f61018c529915afb88839c6c75c))
* cross xml array mode definition ([#133](https://github.com/MapColonies/catalog-web-app-bff/issues/133)) ([af216ff](https://github.com/MapColonies/catalog-web-app-bff/commit/af216ff1e959102f5988b4fc262398d09080241e))
* csw get records error handling  (MAPCO-5411) ([#172](https://github.com/MapColonies/catalog-web-app-bff/issues/172)) ([4df3880](https://github.com/MapColonies/catalog-web-app-bff/commit/4df38805abf4eb5363bbcb060f1ee3b899f6f1aa))
* dem ([#44](https://github.com/MapColonies/catalog-web-app-bff/issues/44)) ([2712939](https://github.com/MapColonies/catalog-web-app-bff/commit/27129390128a4abfaa2ee34792bb3d5ea3c14b63))
* dem ([#46](https://github.com/MapColonies/catalog-web-app-bff/issues/46)) ([cd802df](https://github.com/MapColonies/catalog-web-app-bff/commit/cd802df14fade091ab0da4bc56f45eb3a5250334))
* dem ([#49](https://github.com/MapColonies/catalog-web-app-bff/issues/49)) ([0c5a6d2](https://github.com/MapColonies/catalog-web-app-bff/commit/0c5a6d2eb21c23f3d7ef148c7500dcdc185c4d24))
* dem csw from config ([#43](https://github.com/MapColonies/catalog-web-app-bff/issues/43)) ([bf7bf93](https://github.com/MapColonies/catalog-web-app-bff/commit/bf7bf93ec3f8fb0ed6d7a39ae817d690640ca71b))
* dem defaults ([#58](https://github.com/MapColonies/catalog-web-app-bff/issues/58)) ([c81c4ee](https://github.com/MapColonies/catalog-web-app-bff/commit/c81c4eeebbf491ef0c10e5ab13cec8baee212ff6))
* dem view mode ([#45](https://github.com/MapColonies/catalog-web-app-bff/issues/45)) ([4bdd06d](https://github.com/MapColonies/catalog-web-app-bff/commit/4bdd06d510f9e6f8dcc37ed9335b10e2d40a48e0))
* dependencies errors ([9129729](https://github.com/MapColonies/catalog-web-app-bff/commit/9129729c08960dba2b56ec449628d941e0ec9866))
* disable RasterVectorBest entity MAPCO-2551 ([#118](https://github.com/MapColonies/catalog-web-app-bff/issues/118)) ([862f670](https://github.com/MapColonies/catalog-web-app-bff/commit/862f670efe8a1063d68573d38278c3466880b4cb))
* dynamic base path for openapi ([#255](https://github.com/MapColonies/catalog-web-app-bff/issues/255)) ([0e5c0f2](https://github.com/MapColonies/catalog-web-app-bff/commit/0e5c0f217106c65f378363feead7a013abba409f))
* elevations new input & output format ([#151](https://github.com/MapColonies/catalog-web-app-bff/issues/151)) ([418ea1c](https://github.com/MapColonies/catalog-web-app-bff/commit/418ea1c462494d97c2b3024642c57d9b726f7e0e))
* entity fields order ([#193](https://github.com/MapColonies/catalog-web-app-bff/issues/193)) ([e37f5ad](https://github.com/MapColonies/catalog-web-app-bff/commit/e37f5ad160f20a8b555f0903cae38db5a2509e1f))
* error handling ([#174](https://github.com/MapColonies/catalog-web-app-bff/issues/174)) ([765307c](https://github.com/MapColonies/catalog-web-app-bff/commit/765307c3afc555ce394004b18203b6361853efeb))
* errors ([#136](https://github.com/MapColonies/catalog-web-app-bff/issues/136)) ([513a64f](https://github.com/MapColonies/catalog-web-app-bff/commit/513a64fc429eed5a27101a7d89c4e7ecd35669dd))
* eslint ([#192](https://github.com/MapColonies/catalog-web-app-bff/issues/192)) ([d2ffe45](https://github.com/MapColonies/catalog-web-app-bff/commit/d2ffe45d8150bda9e839fef855d43920b845c413))
* exclude export jobs (MAPCO-8080) ([#242](https://github.com/MapColonies/catalog-web-app-bff/issues/242)) ([8536eb8](https://github.com/MapColonies/catalog-web-app-bff/commit/8536eb81b645f975ca4f58817dbe61c99ab352d8))
* export url ([#188](https://github.com/MapColonies/catalog-web-app-bff/issues/188)) ([fd7b47b](https://github.com/MapColonies/catalog-web-app-bff/commit/fd7b47b2a53a3bad5f5d3927c543fd6546d4dd11))
* exposure type ([b23fe99](https://github.com/MapColonies/catalog-web-app-bff/commit/b23fe999e09c2a0173ecf31c44a54574f1ff9782))
* fields info layout ([#102](https://github.com/MapColonies/catalog-web-app-bff/issues/102)) ([05fb570](https://github.com/MapColonies/catalog-web-app-bff/commit/05fb570316acde06411fea8fe7856211a98a27fd))
* fix ([b78d62b](https://github.com/MapColonies/catalog-web-app-bff/commit/b78d62b237a5021da6cad86811e2e228ec75ac18))
* fix ([#191](https://github.com/MapColonies/catalog-web-app-bff/issues/191)) ([70c4d82](https://github.com/MapColonies/catalog-web-app-bff/commit/70c4d8202f1f1db61b6f9de6044f75b7a711251e))
* footprint minus ninety + capabilities promise all ([#91](https://github.com/MapColonies/catalog-web-app-bff/issues/91)) ([a06080a](https://github.com/MapColonies/catalog-web-app-bff/commit/a06080aa59aa707005dce4b85a7b05b2b32186b1))
* for validations ([#26](https://github.com/MapColonies/catalog-web-app-bff/issues/26)) ([7b93544](https://github.com/MapColonies/catalog-web-app-bff/commit/7b93544723021c1eaa87e34efa035bb7c4762d7f))
* for validations ([#29](https://github.com/MapColonies/catalog-web-app-bff/issues/29)) ([d0092c6](https://github.com/MapColonies/catalog-web-app-bff/commit/d0092c6405d21db8cdc58f073e294ad0e67eaa6d))
* get capabilities ([#80](https://github.com/MapColonies/catalog-web-app-bff/issues/80)) ([02b653e](https://github.com/MapColonies/catalog-web-app-bff/commit/02b653e7691280cc8402a8c096844555a2698540))
* get dem get capabilities url ([#87](https://github.com/MapColonies/catalog-web-app-bff/issues/87)) ([46183ce](https://github.com/MapColonies/catalog-web-app-bff/commit/46183ce41c874bf10f8b95b41aae4458035b6231))
* getactive job implementation ( MAPCO-8441 ) ([#238](https://github.com/MapColonies/catalog-web-app-bff/issues/238)) ([340f897](https://github.com/MapColonies/catalog-web-app-bff/commit/340f897737a1d9a6dab6dc978f0561e65d08404d))
* getCapabilities should not throw unmanaged exceptions ([#115](https://github.com/MapColonies/catalog-web-app-bff/issues/115)) ([8431803](https://github.com/MapColonies/catalog-web-app-bff/commit/843180336eae9f0498e5d2a379592ca138994b4b))
* getrecordsbyid schematic ([#20](https://github.com/MapColonies/catalog-web-app-bff/issues/20)) ([741c7e4](https://github.com/MapColonies/catalog-web-app-bff/commit/741c7e4f0e57c3c2dededc1956230f1934ccc5d3))
* helm ([#222](https://github.com/MapColonies/catalog-web-app-bff/issues/222)) ([d4d0644](https://github.com/MapColonies/catalog-web-app-bff/commit/d4d0644132e84de731a666843a0383ccf0d672de))
* helm artifacts ([79ce782](https://github.com/MapColonies/catalog-web-app-bff/commit/79ce782b7997f8c5c19bfc9e6b10372da9544199))
* ingestion fields synch ([#30](https://github.com/MapColonies/catalog-web-app-bff/issues/30)) ([8a585c2](https://github.com/MapColonies/catalog-web-app-bff/commit/8a585c2282dabd10aebc471f313bc683860b8b82))
* integrate csw-client 1.0.6 ([ea8dda0](https://github.com/MapColonies/catalog-web-app-bff/commit/ea8dda0b16f27a378d6334afb824013c8b84657c))
* integration with 3d ([#33](https://github.com/MapColonies/catalog-web-app-bff/issues/33)) ([45945e9](https://github.com/MapColonies/catalog-web-app-bff/commit/45945e923d82cb934ca38eb232ba9699e0fa6ae2))
* **integration:** bump mc-models, parse xml values ([#4](https://github.com/MapColonies/catalog-web-app-bff/issues/4)) ([521f4ff](https://github.com/MapColonies/catalog-web-app-bff/commit/521f4ffd6a6950a2354e70c2bbe7bc4b7fe78ac1))
* job manager common template ([#134](https://github.com/MapColonies/catalog-web-app-bff/issues/134)) ([77ab5c6](https://github.com/MapColonies/catalog-web-app-bff/commit/77ab5c63c6b0f5fc87d95f4dc08f55219b339c70))
* jobs available actions logic ([#132](https://github.com/MapColonies/catalog-web-app-bff/issues/132)) ([e551014](https://github.com/MapColonies/catalog-web-app-bff/commit/e551014ca1531908ff90a6bcc7221b8e9bf25552))
* jobs product type ([#47](https://github.com/MapColonies/catalog-web-app-bff/issues/47)) ([d825ef6](https://github.com/MapColonies/catalog-web-app-bff/commit/d825ef657e5c4f4b3120722eed45bd1525a0119d))
* jobs without tasks api call ([#64](https://github.com/MapColonies/catalog-web-app-bff/issues/64)) ([6355789](https://github.com/MapColonies/catalog-web-app-bff/commit/63557896700412b54654d33b182ee39ef632723c))
* json fields copyable decoration ([#153](https://github.com/MapColonies/catalog-web-app-bff/issues/153)) ([f852b06](https://github.com/MapColonies/catalog-web-app-bff/commit/f852b064af61c66ee6f26fabe9e19a03a14f8e83))
* jsonObj.Capabilities.Contents.Layer.filter error ([#120](https://github.com/MapColonies/catalog-web-app-bff/issues/120)) ([ccbbba4](https://github.com/MapColonies/catalog-web-app-bff/commit/ccbbba4cb7ff60ad2b64835174921e6b1245ef1c))
* layerparts ingestion ([#32](https://github.com/MapColonies/catalog-web-app-bff/issues/32)) ([ac1f4f9](https://github.com/MapColonies/catalog-web-app-bff/commit/ac1f4f9e9624e58602c9ea3e58c467ea710ccff5))
* layers metadata.json transform fix, separate concerns ([#77](https://github.com/MapColonies/catalog-web-app-bff/issues/77)) ([934d578](https://github.com/MapColonies/catalog-web-app-bff/commit/934d5782492f25d0e07ca9cf5f373e832caa49ec))
* lgtm ([#100](https://github.com/MapColonies/catalog-web-app-bff/issues/100)) ([5345872](https://github.com/MapColonies/catalog-web-app-bff/commit/5345872b4a08a1089f7b8864ea7888c113acc866))
* lgtm errors ([#61](https://github.com/MapColonies/catalog-web-app-bff/issues/61)) ([fe8dac0](https://github.com/MapColonies/catalog-web-app-bff/commit/fe8dac031062a85bdb8005dd2367c0f719bba6f7))
* lint ([#261](https://github.com/MapColonies/catalog-web-app-bff/issues/261)) ([31432b6](https://github.com/MapColonies/catalog-web-app-bff/commit/31432b6ee82d9f05c1c5383cbcd41e24447236c9))
* lint raster resovle metadata as model ([#228](https://github.com/MapColonies/catalog-web-app-bff/issues/228)) ([d24db34](https://github.com/MapColonies/catalog-web-app-bff/commit/d24db340106a9058377840bc6f95bd2c3085e3ca))
* lookup tables ([#176](https://github.com/MapColonies/catalog-web-app-bff/issues/176)) ([f8ba742](https://github.com/MapColonies/catalog-web-app-bff/commit/f8ba74272692b07c5593ab200f5afe8835a79257))
* mc models version ([#105](https://github.com/MapColonies/catalog-web-app-bff/issues/105)) ([8e49fd5](https://github.com/MapColonies/catalog-web-app-bff/commit/8e49fd55efdd79551e180e7bc17860b6c1d65e20))
* mc-models update ([#27](https://github.com/MapColonies/catalog-web-app-bff/issues/27)) ([25a86e4](https://github.com/MapColonies/catalog-web-app-bff/commit/25a86e4625e04252bd9442bf2875f436389e5c86))
* merge fix ([#129](https://github.com/MapColonies/catalog-web-app-bff/issues/129)) ([f346620](https://github.com/MapColonies/catalog-web-app-bff/commit/f3466200ad400aafb83939948d7ee85c56538e2d))
* missing copyable in dem ([#54](https://github.com/MapColonies/catalog-web-app-bff/issues/54)) ([74dc7ba](https://github.com/MapColonies/catalog-web-app-bff/commit/74dc7baf03dfd07af3da3668fd6089a3d12f6021))
* missing internal prop ([12c0777](https://github.com/MapColonies/catalog-web-app-bff/commit/12c07772e4d5b0c618c1fef7acf5e37e9514a514))
* missing internal prop ([#109](https://github.com/MapColonies/catalog-web-app-bff/issues/109)) ([95e793f](https://github.com/MapColonies/catalog-web-app-bff/commit/95e793fd5143ece2f558844f333990760f52f34c))
* missing is copyable ([#54](https://github.com/MapColonies/catalog-web-app-bff/issues/54)) ([8bb302d](https://github.com/MapColonies/catalog-web-app-bff/commit/8bb302d0db29b4b14df1b88804105ecc91e711aa))
* mount dir for restore (MAPCO-8436) ([#211](https://github.com/MapColonies/catalog-web-app-bff/issues/211)) ([65a9865](https://github.com/MapColonies/catalog-web-app-bff/commit/65a98654b11e2783ba780aada30076e0a5b8463d))
* new fields label ([#25](https://github.com/MapColonies/catalog-web-app-bff/issues/25)) ([03882c0](https://github.com/MapColonies/catalog-web-app-bff/commit/03882c0ceb5d3083e147902aee0bf94d92e46707))
* nullable ([9ead36c](https://github.com/MapColonies/catalog-web-app-bff/commit/9ead36cda3c82af15b9c3a69002e45dc10d28125))
* openapi ([ff8dd5a](https://github.com/MapColonies/catalog-web-app-bff/commit/ff8dd5ae89c0c1d2b965febaec604eaf66ad6c6b))
* openapi ([#246](https://github.com/MapColonies/catalog-web-app-bff/issues/246)) ([bb1485c](https://github.com/MapColonies/catalog-web-app-bff/commit/bb1485c347f4321aebe7027e09c22f1023c99e3f))
* openapi ([#249](https://github.com/MapColonies/catalog-web-app-bff/issues/249)) ([01260ec](https://github.com/MapColonies/catalog-web-app-bff/commit/01260ecbbd69324672ec182ca03103d1e5968ea7))
* openapi for deployment ([#251](https://github.com/MapColonies/catalog-web-app-bff/issues/251)) ([1a850ea](https://github.com/MapColonies/catalog-web-app-bff/commit/1a850ea211760c29cee404f18a6089de6961c4ed))
* order ([#194](https://github.com/MapColonies/catalog-web-app-bff/issues/194)) ([dd29894](https://github.com/MapColonies/catalog-web-app-bff/commit/dd29894ba6a855cf3dc331324a9786e9976279c0))
* order and brief ([#195](https://github.com/MapColonies/catalog-web-app-bff/issues/195)) ([bce571a](https://github.com/MapColonies/catalog-web-app-bff/commit/bce571ab16897265fce80f8f60751a4ba6a2d671))
* overlap fields ([#41](https://github.com/MapColonies/catalog-web-app-bff/issues/41)) ([4cd1b79](https://github.com/MapColonies/catalog-web-app-bff/commit/4cd1b79b4bd8118ee845b9eef6009dd983d36f82))
* pass Enum providerType to the client ([#181](https://github.com/MapColonies/catalog-web-app-bff/issues/181)) ([badd2ca](https://github.com/MapColonies/catalog-web-app-bff/commit/badd2ca6540ecb34c93750b2a60218b22845ceb0))
* polygon parts exposure type ([ce0b4e2](https://github.com/MapColonies/catalog-web-app-bff/commit/ce0b4e21ab18898b9a2e12e4645bb8b9dfc1b847))
* prepare discretes actual value ([#22](https://github.com/MapColonies/catalog-web-app-bff/issues/22)) ([0e49859](https://github.com/MapColonies/catalog-web-app-bff/commit/0e498596ea94d9232a775ddb155fe12349811fc8))
* ptoduct type freeze on update ([#137](https://github.com/MapColonies/catalog-web-app-bff/issues/137)) ([d7d267d](https://github.com/MapColonies/catalog-web-app-bff/commit/d7d267daed07c655b39c294652a623760bf03429))
* raster edit payload ([#190](https://github.com/MapColonies/catalog-web-app-bff/issues/190)) ([6fce4d6](https://github.com/MapColonies/catalog-web-app-bff/commit/6fce4d6de6f608f4b37345149dbf451cfad00240))
* raster ingestion - expected relative dir path ([#69](https://github.com/MapColonies/catalog-web-app-bff/issues/69)) ([af9d2aa](https://github.com/MapColonies/catalog-web-app-bff/commit/af9d2aa1f63fc791faa3105cc4a013277eaf1bad))
* raster insertdate granularity ([#124](https://github.com/MapColonies/catalog-web-app-bff/issues/124)) ([840a1b7](https://github.com/MapColonies/catalog-web-app-bff/commit/840a1b74e3f493982bc279c487846233f6bbcdc0))
* raster job retry (MAPCO: 8438) ([#234](https://github.com/MapColonies/catalog-web-app-bff/issues/234)) ([8a513fd](https://github.com/MapColonies/catalog-web-app-bff/commit/8a513fd8766121ebe8341a741de2a41fe77d3af9))
* read only filepath ([#259](https://github.com/MapColonies/catalog-web-app-bff/issues/259)) ([8e54836](https://github.com/MapColonies/catalog-web-app-bff/commit/8e54836ab23e7263913ab21d9ee5ac7177965e28))
* remove dem map server from external services ([#142](https://github.com/MapColonies/catalog-web-app-bff/issues/142)) ([6a1d8b0](https://github.com/MapColonies/catalog-web-app-bff/commit/6a1d8b0667ca95b2adc4f56da20c5e6b2a10b025))
* remove fetch vector in other catalogs ([#197](https://github.com/MapColonies/catalog-web-app-bff/issues/197)) ([601fe7b](https://github.com/MapColonies/catalog-web-app-bff/commit/601fe7b18a99c3d816a42c8516485ef605a1d34f))
* resolve job metadata as entity ([#219](https://github.com/MapColonies/catalog-web-app-bff/issues/219)) ([0016a63](https://github.com/MapColonies/catalog-web-app-bff/commit/0016a63b38673f7a444db7e3989cbab2d1cb4440))
* resolve job metadata as entity ([#224](https://github.com/MapColonies/catalog-web-app-bff/issues/224)) ([61f5be7](https://github.com/MapColonies/catalog-web-app-bff/commit/61f5be7f53ff402df4de30f0f34b7f63d16b43f5))
* revert ([87d8aea](https://github.com/MapColonies/catalog-web-app-bff/commit/87d8aea54a54ea8348455180228a16fd175248fe))
* revert plus buffer size ([#226](https://github.com/MapColonies/catalog-web-app-bff/issues/226)) ([feed4e9](https://github.com/MapColonies/catalog-web-app-bff/commit/feed4e97e8775e04996290dc817a0ad60010ad7b))
* revert product version ([#98](https://github.com/MapColonies/catalog-web-app-bff/issues/98)) ([5ec750f](https://github.com/MapColonies/catalog-web-app-bff/commit/5ec750f10d694b71bc73be5828dab0f4b388c0fb))
* search results list values ([#155](https://github.com/MapColonies/catalog-web-app-bff/issues/155)) ([5a27868](https://github.com/MapColonies/catalog-web-app-bff/commit/5a27868300e7ed50bd4c4245b186fea6de1eae3b))
* static parts of urls ([#161](https://github.com/MapColonies/catalog-web-app-bff/issues/161)) ([d03b83a](https://github.com/MapColonies/catalog-web-app-bff/commit/d03b83afeb6545c4e2b6884eb7b3d80e125c3178))
* storage explorer transform metadata to entity ([#66](https://github.com/MapColonies/catalog-web-app-bff/issues/66)) ([dd36e9a](https://github.com/MapColonies/catalog-web-app-bff/commit/dd36e9acb31bf8c97e3c8270239e87339b3d17f4))
* support specific and official routes ([d80b14a](https://github.com/MapColonies/catalog-web-app-bff/commit/d80b14a166088c449931bff64960993309571c24))
* swap update ([#269](https://github.com/MapColonies/catalog-web-app-bff/issues/269)) ([81d6de7](https://github.com/MapColonies/catalog-web-app-bff/commit/81d6de7d57d4f4e783235461c45dc3eab41d7aa7))
* sync ([#82](https://github.com/MapColonies/catalog-web-app-bff/issues/82)) ([f15e775](https://github.com/MapColonies/catalog-web-app-bff/commit/f15e7751594e0c68c599dc187337048ce37c62c9))
* sync footprint ([#92](https://github.com/MapColonies/catalog-web-app-bff/issues/92)) ([1c5de89](https://github.com/MapColonies/catalog-web-app-bff/commit/1c5de898ddf731e58f4c31543f48625c323ba4ff))
* task fetching and linting ([#51](https://github.com/MapColonies/catalog-web-app-bff/issues/51)) ([5a1a2aa](https://github.com/MapColonies/catalog-web-app-bff/commit/5a1a2aa430a7954f73dc45d9880158f77aefab2b))
* test ([#253](https://github.com/MapColonies/catalog-web-app-bff/issues/253)) ([bd7aecf](https://github.com/MapColonies/catalog-web-app-bff/commit/bd7aecf572179bd4e10edc45920ef2f44a766395))
* token var name ([#70](https://github.com/MapColonies/catalog-web-app-bff/issues/70)) ([c087a95](https://github.com/MapColonies/catalog-web-app-bff/commit/c087a95c99d9f18cdec630f610c28a6d7b4b8c3d))
* tooltips ([#52](https://github.com/MapColonies/catalog-web-app-bff/issues/52)) ([743dee9](https://github.com/MapColonies/catalog-web-app-bff/commit/743dee99812b0edafeedfac11c78a1cec9b33944))
* update 3d model ([#7](https://github.com/MapColonies/catalog-web-app-bff/issues/7)) ([5995973](https://github.com/MapColonies/catalog-web-app-bff/commit/5995973941080b8c5eca35d52ab4f92939c0ba66))
* update build_and_push.yaml ([df28316](https://github.com/MapColonies/catalog-web-app-bff/commit/df28316ebe4d335bf38785cb3931708294505741))
* update build_and_push.yaml ([133137a](https://github.com/MapColonies/catalog-web-app-bff/commit/133137aeba19367dda96e970dece7ab2d3d3a00a))
* update fields in raster ui-aspects ([#170](https://github.com/MapColonies/catalog-web-app-bff/issues/170)) ([1e54d02](https://github.com/MapColonies/catalog-web-app-bff/commit/1e54d02597e5a6594a5eb8b88da5061fdebc2cbe))
* use pathsuffix instead of new path ([#206](https://github.com/MapColonies/catalog-web-app-bff/issues/206)) ([8863810](https://github.com/MapColonies/catalog-web-app-bff/commit/886381019c2772fc1c676d8534565aa655344c1b))
* use wmts layer url from capabilities (MAPCO-2648) ([#121](https://github.com/MapColonies/catalog-web-app-bff/issues/121)) ([3578ed2](https://github.com/MapColonies/catalog-web-app-bff/commit/3578ed213414d2170add3ed1cdafb6550ef9bb87))
* v2 ([5bdbd88](https://github.com/MapColonies/catalog-web-app-bff/commit/5bdbd886498857ee975e8ff77f73e30f88d86527))
* v2.1.1 bugs and improvements ([#150](https://github.com/MapColonies/catalog-web-app-bff/issues/150)) ([b2dc75e](https://github.com/MapColonies/catalog-web-app-bff/commit/b2dc75e53872ad20f45321f755376f32394d343d))
* value type enum name ([#34](https://github.com/MapColonies/catalog-web-app-bff/issues/34)) ([7ebe063](https://github.com/MapColonies/catalog-web-app-bff/commit/7ebe06361d4b01599a693ba043ffb15fb830a985))
* vector raster best - links should be with full width ([#114](https://github.com/MapColonies/catalog-web-app-bff/issues/114)) ([90c5e63](https://github.com/MapColonies/catalog-web-app-bff/commit/90c5e630c296fdd2b4f7d743137ea89b8ce22a67))
* wfs exposure type ([#199](https://github.com/MapColonies/catalog-web-app-bff/issues/199)) ([4b5fae6](https://github.com/MapColonies/catalog-web-app-bff/commit/4b5fae6b4346b7c41f0f153e3c1ea2ceb235e03e))
* wfs services config icons ([b107eb4](https://github.com/MapColonies/catalog-web-app-bff/commit/b107eb4d3d38df694cc4e70b3f5a2354a75b10b7))
* wfs url should be route for app and support token according to config (MAPCO-8477) ([#200](https://github.com/MapColonies/catalog-web-app-bff/issues/200)) ([16f0b7f](https://github.com/MapColonies/catalog-web-app-bff/commit/16f0b7f14ca6b223123b4fd705e83ff59a413a98))
* with mount ([#257](https://github.com/MapColonies/catalog-web-app-bff/issues/257)) ([681bbe0](https://github.com/MapColonies/catalog-web-app-bff/commit/681bbe0e7db45c15d6a2619e39ca7b8f342d1699))
* with shaziri changes ([#196](https://github.com/MapColonies/catalog-web-app-bff/issues/196)) ([ebfb909](https://github.com/MapColonies/catalog-web-app-bff/commit/ebfb909cb1573b143fcc123d03a58988795da7bb))
* without tmp ([#263](https://github.com/MapColonies/catalog-web-app-bff/issues/263)) ([55e0e69](https://github.com/MapColonies/catalog-web-app-bff/commit/55e0e69c1558f128009af7f34137305cff0a05d5))
* wmts capabilities path injection ([#243](https://github.com/MapColonies/catalog-web-app-bff/issues/243)) ([045275d](https://github.com/MapColonies/catalog-web-app-bff/commit/045275d13ea1fa4848e8ac14cb7236a3b3792ece))

## [2.2.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.2.0...v2.2.1) (2026-02-08)


### Bug Fixes

* abort ([#273](https://github.com/MapColonies/catalog-web-app-bff/issues/273)) ([48af821](https://github.com/MapColonies/catalog-web-app-bff/commit/48af821ba8fff918b4098244177c8a2422ab683a))

## [2.2.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.14...v2.2.0) (2026-02-02)


### Features

* domain job action with job type ([#271](https://github.com/MapColonies/catalog-web-app-bff/issues/271)) ([90ba999](https://github.com/MapColonies/catalog-web-app-bff/commit/90ba9995efca9bb27fc076a5870932544b1fbedb))

## [2.1.14](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.13...v2.1.14) (2026-02-01)


### Bug Fixes

* swap update ([#269](https://github.com/MapColonies/catalog-web-app-bff/issues/269)) ([81d6de7](https://github.com/MapColonies/catalog-web-app-bff/commit/81d6de7d57d4f4e783235461c45dc3eab41d7aa7))

## [2.1.13](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.12...v2.1.13) (2026-01-22)


### Bug Fixes

* correct job abort api path ([#267](https://github.com/MapColonies/catalog-web-app-bff/issues/267)) ([f3698fc](https://github.com/MapColonies/catalog-web-app-bff/commit/f3698fc678533f61018c529915afb88839c6c75c))

## [2.1.12](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.11...v2.1.12) (2026-01-08)


### Bug Fixes

* bff ([#265](https://github.com/MapColonies/catalog-web-app-bff/issues/265)) ([5346380](https://github.com/MapColonies/catalog-web-app-bff/commit/53463809858f05148c1596c968bf452bfad991c1))

## [2.1.11](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.10...v2.1.11) (2026-01-08)


### Bug Fixes

* without tmp ([#263](https://github.com/MapColonies/catalog-web-app-bff/issues/263)) ([55e0e69](https://github.com/MapColonies/catalog-web-app-bff/commit/55e0e69c1558f128009af7f34137305cff0a05d5))

## [2.1.10](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.9...v2.1.10) (2026-01-08)


### Bug Fixes

* lint ([#261](https://github.com/MapColonies/catalog-web-app-bff/issues/261)) ([31432b6](https://github.com/MapColonies/catalog-web-app-bff/commit/31432b6ee82d9f05c1c5383cbcd41e24447236c9))
* read only filepath ([#259](https://github.com/MapColonies/catalog-web-app-bff/issues/259)) ([8e54836](https://github.com/MapColonies/catalog-web-app-bff/commit/8e54836ab23e7263913ab21d9ee5ac7177965e28))

## [2.1.9](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.8...v2.1.9) (2026-01-08)


### Bug Fixes

* with mount ([#257](https://github.com/MapColonies/catalog-web-app-bff/issues/257)) ([681bbe0](https://github.com/MapColonies/catalog-web-app-bff/commit/681bbe0e7db45c15d6a2619e39ca7b8f342d1699))

## [2.1.8](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.7...v2.1.8) (2026-01-08)


### Bug Fixes

* dynamic base path for openapi ([#255](https://github.com/MapColonies/catalog-web-app-bff/issues/255)) ([0e5c0f2](https://github.com/MapColonies/catalog-web-app-bff/commit/0e5c0f217106c65f378363feead7a013abba409f))

## [2.1.7](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.6...v2.1.7) (2026-01-08)


### Bug Fixes

* test ([#253](https://github.com/MapColonies/catalog-web-app-bff/issues/253)) ([bd7aecf](https://github.com/MapColonies/catalog-web-app-bff/commit/bd7aecf572179bd4e10edc45920ef2f44a766395))

## [2.1.6](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.5...v2.1.6) (2026-01-08)


### Bug Fixes

* openapi for deployment ([#251](https://github.com/MapColonies/catalog-web-app-bff/issues/251)) ([1a850ea](https://github.com/MapColonies/catalog-web-app-bff/commit/1a850ea211760c29cee404f18a6089de6961c4ed))

## [2.1.5](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.4...v2.1.5) (2026-01-08)


### Bug Fixes

* openapi ([ff8dd5a](https://github.com/MapColonies/catalog-web-app-bff/commit/ff8dd5ae89c0c1d2b965febaec604eaf66ad6c6b))
* openapi ([#249](https://github.com/MapColonies/catalog-web-app-bff/issues/249)) ([01260ec](https://github.com/MapColonies/catalog-web-app-bff/commit/01260ecbbd69324672ec182ca03103d1e5968ea7))
* revert ([87d8aea](https://github.com/MapColonies/catalog-web-app-bff/commit/87d8aea54a54ea8348455180228a16fd175248fe))

## [2.1.4](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.3...v2.1.4) (2026-01-07)


### Bug Fixes

* openapi ([#246](https://github.com/MapColonies/catalog-web-app-bff/issues/246)) ([bb1485c](https://github.com/MapColonies/catalog-web-app-bff/commit/bb1485c347f4321aebe7027e09c22f1023c99e3f))

## [2.1.3](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.2...v2.1.3) (2026-01-04)


### Bug Fixes

* exclude export jobs (MAPCO-8080) ([#242](https://github.com/MapColonies/catalog-web-app-bff/issues/242)) ([8536eb8](https://github.com/MapColonies/catalog-web-app-bff/commit/8536eb81b645f975ca4f58817dbe61c99ab352d8))
* wmts capabilities path injection ([#243](https://github.com/MapColonies/catalog-web-app-bff/issues/243)) ([045275d](https://github.com/MapColonies/catalog-web-app-bff/commit/045275d13ea1fa4848e8ac14cb7236a3b3792ece))

## [2.1.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.1...v2.1.2) (2025-12-24)


### Bug Fixes

* getactive job implementation ( MAPCO-8441 ) ([#238](https://github.com/MapColonies/catalog-web-app-bff/issues/238)) ([340f897](https://github.com/MapColonies/catalog-web-app-bff/commit/340f897737a1d9a6dab6dc978f0561e65d08404d))

## [2.1.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.1.0...v2.1.1) (2025-12-16)


### Bug Fixes

* callback urls (MAPCO-8444) ([#236](https://github.com/MapColonies/catalog-web-app-bff/issues/236)) ([95994af](https://github.com/MapColonies/catalog-web-app-bff/commit/95994afcde6051923f0e7cf6f2a93be77c677c81))

## [2.1.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.0.4...v2.1.0) (2025-12-15)


### Features

* New Job Manager for Raster (MAPCO: 8438) ([#230](https://github.com/MapColonies/catalog-web-app-bff/issues/230)) ([6c3f32e](https://github.com/MapColonies/catalog-web-app-bff/commit/6c3f32e4b66569b0b1fa24420966f36f7ed6fd07))
* tasks notifications web socket (MAPCO-8444) ([#233](https://github.com/MapColonies/catalog-web-app-bff/issues/233)) ([44660e0](https://github.com/MapColonies/catalog-web-app-bff/commit/44660e01bc2ab23ba1f86451e1df03ce607ad6a8))


### Bug Fixes

* add RasterJobTypeEnum ([#232](https://github.com/MapColonies/catalog-web-app-bff/issues/232)) ([213b883](https://github.com/MapColonies/catalog-web-app-bff/commit/213b883a6a142eca5979fb34509b46678d01d35d))
* raster job retry (MAPCO: 8438) ([#234](https://github.com/MapColonies/catalog-web-app-bff/issues/234)) ([8a513fd](https://github.com/MapColonies/catalog-web-app-bff/commit/8a513fd8766121ebe8341a741de2a41fe77d3af9))

## [2.0.4](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.0.3...v2.0.4) (2025-12-01)


### Bug Fixes

* lint raster resovle metadata as model ([#228](https://github.com/MapColonies/catalog-web-app-bff/issues/228)) ([d24db34](https://github.com/MapColonies/catalog-web-app-bff/commit/d24db340106a9058377840bc6f95bd2c3085e3ca))

## [2.0.3](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.0.2...v2.0.3) (2025-12-01)


### Bug Fixes

* revert plus buffer size ([#226](https://github.com/MapColonies/catalog-web-app-bff/issues/226)) ([feed4e9](https://github.com/MapColonies/catalog-web-app-bff/commit/feed4e97e8775e04996290dc817a0ad60010ad7b))

## [2.0.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.0.1...v2.0.2) (2025-11-27)


### Bug Fixes

* resolve job metadata as entity ([#224](https://github.com/MapColonies/catalog-web-app-bff/issues/224)) ([61f5be7](https://github.com/MapColonies/catalog-web-app-bff/commit/61f5be7f53ff402df4de30f0f34b7f63d16b43f5))

## [2.0.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v2.0.0...v2.0.1) (2025-11-26)


### Bug Fixes

* helm ([#222](https://github.com/MapColonies/catalog-web-app-bff/issues/222)) ([d4d0644](https://github.com/MapColonies/catalog-web-app-bff/commit/d4d0644132e84de731a666843a0383ccf0d672de))

## [2.0.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.10...v2.0.0) (2025-11-26)


### ⚠ BREAKING CHANGES

* Ingest related api synch ( MAPCO-8421 ) ([#216](https://github.com/MapColonies/catalog-web-app-bff/issues/216))
* new raster ingestion api sync ( MAPCO-8421 ) ([#210](https://github.com/MapColonies/catalog-web-app-bff/issues/210))

### Features

* find tasks (MAPCO-8436) ([#214](https://github.com/MapColonies/catalog-web-app-bff/issues/214)) ([d1a961c](https://github.com/MapColonies/catalog-web-app-bff/commit/d1a961cf3be12f647265386fe7603939905e8f01))
* Ingest related api synch ( MAPCO-8421 ) ([#216](https://github.com/MapColonies/catalog-web-app-bff/issues/216)) ([f340f47](https://github.com/MapColonies/catalog-web-app-bff/commit/f340f471d324e74816cd48ba9210a29639f633f2))
* new raster ingestion api sync ( MAPCO-8421 ) ([#210](https://github.com/MapColonies/catalog-web-app-bff/issues/210)) ([4385a60](https://github.com/MapColonies/catalog-web-app-bff/commit/4385a603f4c1ca3a637414183f05461992787112))
* raster file selection by file type[shp, gpkg] ( MAPCO-8627 ) ([#209](https://github.com/MapColonies/catalog-web-app-bff/issues/209)) ([1b0e74f](https://github.com/MapColonies/catalog-web-app-bff/commit/1b0e74fb0d3a6140d6585c321accff1952a3fb4e))
* split source info queries ([#208](https://github.com/MapColonies/catalog-web-app-bff/issues/208)) ([4ecc1e1](https://github.com/MapColonies/catalog-web-app-bff/commit/4ecc1e1e0ebb296cb4bcebb8d223dd4de7fc0550))


### Bug Fixes

* bff api cors and logging ([#217](https://github.com/MapColonies/catalog-web-app-bff/issues/217)) ([19156c9](https://github.com/MapColonies/catalog-web-app-bff/commit/19156c999fa809d8d8f4eb9cbebece090b32613a))
* condition of target name in raster SE ([#212](https://github.com/MapColonies/catalog-web-app-bff/issues/212)) ([bf6c87e](https://github.com/MapColonies/catalog-web-app-bff/commit/bf6c87e4db2c635b37ac8d44fb5ad1f163c280d1))
* mount dir for restore (MAPCO-8436) ([#211](https://github.com/MapColonies/catalog-web-app-bff/issues/211)) ([65a9865](https://github.com/MapColonies/catalog-web-app-bff/commit/65a98654b11e2783ba780aada30076e0a5b8463d))
* resolve job metadata as entity ([#219](https://github.com/MapColonies/catalog-web-app-bff/issues/219)) ([0016a63](https://github.com/MapColonies/catalog-web-app-bff/commit/0016a63b38673f7a444db7e3989cbab2d1cb4440))
* use pathsuffix instead of new path ([#206](https://github.com/MapColonies/catalog-web-app-bff/issues/206)) ([8863810](https://github.com/MapColonies/catalog-web-app-bff/commit/886381019c2772fc1c676d8534565aa655344c1b))
* wfs exposure type ([#199](https://github.com/MapColonies/catalog-web-app-bff/issues/199)) ([4b5fae6](https://github.com/MapColonies/catalog-web-app-bff/commit/4b5fae6b4346b7c41f0f153e3c1ea2ceb235e03e))
* wfs url should be route for app and support token according to config (MAPCO-8477) ([#200](https://github.com/MapColonies/catalog-web-app-bff/issues/200)) ([16f0b7f](https://github.com/MapColonies/catalog-web-app-bff/commit/16f0b7f14ca6b223123b4fd705e83ff59a413a98))

### [1.27.10](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.9...v1.27.10) (2025-07-20)


### Bug Fixes

* remove fetch vector in other catalogs ([#197](https://github.com/MapColonies/catalog-web-app-bff/issues/197)) ([601fe7b](https://github.com/MapColonies/catalog-web-app-bff/commit/601fe7b18a99c3d816a42c8516485ef605a1d34f))

### [1.27.9](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.8...v1.27.9) (2025-07-07)


### Bug Fixes

* with shaziri changes ([#196](https://github.com/MapColonies/catalog-web-app-bff/issues/196)) ([ebfb909](https://github.com/MapColonies/catalog-web-app-bff/commit/ebfb909cb1573b143fcc123d03a58988795da7bb))

### [1.27.8](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.7...v1.27.8) (2025-07-06)


### Bug Fixes

* order and brief ([#195](https://github.com/MapColonies/catalog-web-app-bff/issues/195)) ([bce571a](https://github.com/MapColonies/catalog-web-app-bff/commit/bce571ab16897265fce80f8f60751a4ba6a2d671))

### [1.27.7](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.6...v1.27.7) (2025-07-06)


### Bug Fixes

* order ([#194](https://github.com/MapColonies/catalog-web-app-bff/issues/194)) ([dd29894](https://github.com/MapColonies/catalog-web-app-bff/commit/dd29894ba6a855cf3dc331324a9786e9976279c0))

### [1.27.6](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.5...v1.27.6) (2025-07-06)


### Bug Fixes

* entity fields order ([#193](https://github.com/MapColonies/catalog-web-app-bff/issues/193)) ([e37f5ad](https://github.com/MapColonies/catalog-web-app-bff/commit/e37f5ad160f20a8b555f0903cae38db5a2509e1f))

### [1.27.5](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.4...v1.27.5) (2025-06-30)


### Bug Fixes

* fix ([b78d62b](https://github.com/MapColonies/catalog-web-app-bff/commit/b78d62b237a5021da6cad86811e2e228ec75ac18))

### [1.27.4](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.3...v1.27.4) (2025-06-29)


### Bug Fixes

* eslint ([#192](https://github.com/MapColonies/catalog-web-app-bff/issues/192)) ([d2ffe45](https://github.com/MapColonies/catalog-web-app-bff/commit/d2ffe45d8150bda9e839fef855d43920b845c413))

### [1.27.3](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.2...v1.27.3) (2025-06-29)


### Bug Fixes

* fix ([#191](https://github.com/MapColonies/catalog-web-app-bff/issues/191)) ([70c4d82](https://github.com/MapColonies/catalog-web-app-bff/commit/70c4d8202f1f1db61b6f9de6044f75b7a711251e))

### [1.27.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.1...v1.27.2) (2025-06-26)


### Bug Fixes

* raster edit payload ([#190](https://github.com/MapColonies/catalog-web-app-bff/issues/190)) ([6fce4d6](https://github.com/MapColonies/catalog-web-app-bff/commit/6fce4d6de6f608f4b37345149dbf451cfad00240))

### [1.27.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.27.0...v1.27.1) (2025-06-19)

## [1.27.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.26.0...v1.27.0) (2025-06-18)


### Features

* raster product status publish unpublish ([#187](https://github.com/MapColonies/catalog-web-app-bff/issues/187)) ([4e5631a](https://github.com/MapColonies/catalog-web-app-bff/commit/4e5631a53f42c7368e5ca214dcb59faf5ffdad5b))
* vector catalog ([#185](https://github.com/MapColonies/catalog-web-app-bff/issues/185)) ([931197e](https://github.com/MapColonies/catalog-web-app-bff/commit/931197e0c73a5ddbcdc52d8de9ce94affb0753b5))


### Bug Fixes

* export url ([#188](https://github.com/MapColonies/catalog-web-app-bff/issues/188)) ([fd7b47b](https://github.com/MapColonies/catalog-web-app-bff/commit/fd7b47b2a53a3bad5f5d3927c543fd6546d4dd11))

## [1.26.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.25.2...v1.26.0) (2025-02-20)


### Features

* support wfs pagination ([#184](https://github.com/MapColonies/catalog-web-app-bff/issues/184)) ([b25d53e](https://github.com/MapColonies/catalog-web-app-bff/commit/b25d53e8cc9507121ed7517045be73a88c2494db))

### [1.25.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.25.1...v1.25.2) (2025-02-16)

### [1.25.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.25.0...v1.25.1) (2025-02-09)


### Bug Fixes

* axios limit ([#182](https://github.com/MapColonies/catalog-web-app-bff/issues/182)) ([18f2cc0](https://github.com/MapColonies/catalog-web-app-bff/commit/18f2cc034314cb170508230d03c44296b0369a36))

## [1.25.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.24.1...v1.25.0) (2025-02-03)


### Features

* support shapefile providers ([#180](https://github.com/MapColonies/catalog-web-app-bff/issues/180)) ([572fa20](https://github.com/MapColonies/catalog-web-app-bff/commit/572fa20fd6eb6d1e3dfc44ef0f2ac9e9b02baff5))


### Bug Fixes

* pass Enum providerType to the client ([#181](https://github.com/MapColonies/catalog-web-app-bff/issues/181)) ([badd2ca](https://github.com/MapColonies/catalog-web-app-bff/commit/badd2ca6540ecb34c93750b2a60218b22845ceb0))

### [1.24.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.24.0...v1.24.1) (2024-12-17)

## [1.24.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.23.5...v1.24.0) (2024-12-16)


### Features

* add new job status called 'Suspended' ([#178](https://github.com/MapColonies/catalog-web-app-bff/issues/178)) ([979c04b](https://github.com/MapColonies/catalog-web-app-bff/commit/979c04b4609a7812786fbf9cf425c15f65fa95cc))
* add new validation for resolutionDegree ([#177](https://github.com/MapColonies/catalog-web-app-bff/issues/177)) ([b989c32](https://github.com/MapColonies/catalog-web-app-bff/commit/b989c32d6c93afcc5fe46f97577564ba0b33aa73))

### [1.23.5](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.23.4...v1.23.5) (2024-12-03)


### Bug Fixes

* exposure type ([b23fe99](https://github.com/MapColonies/catalog-web-app-bff/commit/b23fe999e09c2a0173ecf31c44a54574f1ff9782))

### [1.23.4](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.23.3...v1.23.4) (2024-12-03)


### Bug Fixes

* lookup tables ([#176](https://github.com/MapColonies/catalog-web-app-bff/issues/176)) ([f8ba742](https://github.com/MapColonies/catalog-web-app-bff/commit/f8ba74272692b07c5593ab200f5afe8835a79257))

### [1.23.3](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.23.2...v1.23.3) (2024-12-03)


### Bug Fixes

* bug, change raster and pp ui-aspects from sourceDate to imagingTime ([#171](https://github.com/MapColonies/catalog-web-app-bff/issues/171)) ([dcf7882](https://github.com/MapColonies/catalog-web-app-bff/commit/dcf7882248fa49cfeb98d778d6b38b0f7128bd96))
* change sourceId to be nullable in pp record input ([#173](https://github.com/MapColonies/catalog-web-app-bff/issues/173)) ([4471183](https://github.com/MapColonies/catalog-web-app-bff/commit/44711834efb08babdc0d9bd98fd1fd5cf5302d61))
* csw get records error handling  (MAPCO-5411) ([#172](https://github.com/MapColonies/catalog-web-app-bff/issues/172)) ([4df3880](https://github.com/MapColonies/catalog-web-app-bff/commit/4df38805abf4eb5363bbcb060f1ee3b899f6f1aa))
* error handling ([#174](https://github.com/MapColonies/catalog-web-app-bff/issues/174)) ([765307c](https://github.com/MapColonies/catalog-web-app-bff/commit/765307c3afc555ce394004b18203b6361853efeb))
* update fields in raster ui-aspects ([#170](https://github.com/MapColonies/catalog-web-app-bff/issues/170)) ([1e54d02](https://github.com/MapColonies/catalog-web-app-bff/commit/1e54d02597e5a6594a5eb8b88da5061fdebc2cbe))

### [1.23.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.23.1...v1.23.2) (2024-11-21)

### [1.23.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.23.0...v1.23.1) (2024-11-21)


### Bug Fixes

* bump docker node and helm openapi bumpers ([#169](https://github.com/MapColonies/catalog-web-app-bff/issues/169)) ([2e51d64](https://github.com/MapColonies/catalog-web-app-bff/commit/2e51d64abfda74e1192eaf6bd69d1d03bbbbd36b))
* chart.yaml bump version ([fd4e8ae](https://github.com/MapColonies/catalog-web-app-bff/commit/fd4e8ae8f01e4d584559925a4cc7d1891486d352))

## [1.23.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.22.0...v1.23.0) (2024-11-21)


### Features

* values schema integration ([#167](https://github.com/MapColonies/catalog-web-app-bff/issues/167)) ([7c43963](https://github.com/MapColonies/catalog-web-app-bff/commit/7c439630a0e41b6b0bbf89fcab304142769442dc))


### Bug Fixes

* helm artifacts ([79ce782](https://github.com/MapColonies/catalog-web-app-bff/commit/79ce782b7997f8c5c19bfc9e6b10372da9544199))
* support specific and official routes ([d80b14a](https://github.com/MapColonies/catalog-web-app-bff/commit/d80b14a166088c449931bff64960993309571c24))
* v2 ([5bdbd88](https://github.com/MapColonies/catalog-web-app-bff/commit/5bdbd886498857ee975e8ff77f73e30f88d86527))

## [1.22.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.21.1...v1.22.0) (2024-09-19)


### Features

* use helm common ([#166](https://github.com/MapColonies/catalog-web-app-bff/issues/166)) ([0a5ad1b](https://github.com/MapColonies/catalog-web-app-bff/commit/0a5ad1bd92e7d3d65ec917db4cf3fb7318f21f1b))

### [1.21.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.21.0...v1.21.1) (2024-08-14)

## [1.21.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.20.2...v1.21.0) (2024-08-08)


### Features

* new query - get product ([#164](https://github.com/MapColonies/catalog-web-app-bff/issues/164)) ([c4b771d](https://github.com/MapColonies/catalog-web-app-bff/commit/c4b771d95478e4663857f0b6cfca0f4c02d41aeb))


### Bug Fixes

* nullable ([9ead36c](https://github.com/MapColonies/catalog-web-app-bff/commit/9ead36cda3c82af15b9c3a69002e45dc10d28125))

### [1.20.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.20.1...v1.20.2) (2024-08-01)


### Bug Fixes

* axios default retry mechanism ([#162](https://github.com/MapColonies/catalog-web-app-bff/issues/162)) ([bc7103a](https://github.com/MapColonies/catalog-web-app-bff/commit/bc7103a87e234b352fe5682231f8425990d0b0fa))

### [1.20.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.20.0...v1.20.1) (2024-03-13)


### Bug Fixes

* static parts of urls ([#161](https://github.com/MapColonies/catalog-web-app-bff/issues/161)) ([d03b83a](https://github.com/MapColonies/catalog-web-app-bff/commit/d03b83afeb6545c4e2b6884eb7b3d80e125c3178))

## [1.20.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.19.1...v1.20.0) (2024-02-14)


### Features

* login ( MAPCO-3936 ) ([#160](https://github.com/MapColonies/catalog-web-app-bff/issues/160)) ([48c0086](https://github.com/MapColonies/catalog-web-app-bff/commit/48c0086c486c6dd5b897b610dcae05ad30bf52e3))

### [1.19.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.19.0...v1.19.1) (2023-12-31)


### Bug Fixes

* 3d csw service as route ([#159](https://github.com/MapColonies/catalog-web-app-bff/issues/159)) ([fe914af](https://github.com/MapColonies/catalog-web-app-bff/commit/fe914af33af7f71cf81ae2efcb5d109814967490))

## [1.19.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.18.2...v1.19.0) (2023-12-21)


### Features

* resolution as custom lookup-table (zoomlevelresolutions) ( MAPCO-3631 ) ([#154](https://github.com/MapColonies/catalog-web-app-bff/issues/154)) ([2d62329](https://github.com/MapColonies/catalog-web-app-bff/commit/2d623296763838e31e76bf120362512609d45678))


### Bug Fixes

* add version date to search results info tooltip ([#156](https://github.com/MapColonies/catalog-web-app-bff/issues/156)) ([90c85fe](https://github.com/MapColonies/catalog-web-app-bff/commit/90c85feac3c8b1248c66ce7572bc14a33415d794))
* json fields copyable decoration ([#153](https://github.com/MapColonies/catalog-web-app-bff/issues/153)) ([f852b06](https://github.com/MapColonies/catalog-web-app-bff/commit/f852b064af61c66ee6f26fabe9e19a03a14f8e83))
* search results list values ([#155](https://github.com/MapColonies/catalog-web-app-bff/issues/155)) ([5a27868](https://github.com/MapColonies/catalog-web-app-bff/commit/5a27868300e7ed50bd4c4245b186fea6de1eae3b))

### [1.18.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.18.1...v1.18.2) (2023-11-02)


### Bug Fixes

* brief panel ([#152](https://github.com/MapColonies/catalog-web-app-bff/issues/152)) ([5b8b49e](https://github.com/MapColonies/catalog-web-app-bff/commit/5b8b49ef03036de08fbdca5186c03a718faded8d))
* elevations new input & output format ([#151](https://github.com/MapColonies/catalog-web-app-bff/issues/151)) ([418ea1c](https://github.com/MapColonies/catalog-web-app-bff/commit/418ea1c462494d97c2b3024642c57d9b726f7e0e))

### [1.18.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.18.0...v1.18.1) (2023-10-02)


### Bug Fixes

*  v2.1.1 bugs and improvements ([#150](https://github.com/MapColonies/catalog-web-app-bff/issues/150)) ([b2dc75e](https://github.com/MapColonies/catalog-web-app-bff/commit/b2dc75e53872ad20f45321f755376f32394d343d))

## [1.18.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.16.1...v1.18.0) (2023-09-21)


### Features

* added dem heights service (MAPCO-3364) ([#145](https://github.com/MapColonies/catalog-web-app-bff/issues/145)) ([aa23e78](https://github.com/MapColonies/catalog-web-app-bff/commit/aa23e7813f1777da5a8739491b0f6ced399fb159))
* bff services availability (MAPCO-3354) ([#144](https://github.com/MapColonies/catalog-web-app-bff/issues/144)) ([964d099](https://github.com/MapColonies/catalog-web-app-bff/commit/964d0993e8e07a5f6470f0d194391cfa49621b43))


### Bug Fixes

* polygon parts exposure type ([ce0b4e2](https://github.com/MapColonies/catalog-web-app-bff/commit/ce0b4e21ab18898b9a2e12e4645bb8b9dfc1b847))
* update build_and_push.yaml ([df28316](https://github.com/MapColonies/catalog-web-app-bff/commit/df28316ebe4d335bf38785cb3931708294505741))
* wfs services config icons ([b107eb4](https://github.com/MapColonies/catalog-web-app-bff/commit/b107eb4d3d38df694cc4e70b3f5a2354a75b10b7))

## [1.17.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.16.1...v1.17.0) (2023-09-21)


### Features

* added dem heights service (MAPCO-3364) ([#145](https://github.com/MapColonies/catalog-web-app-bff/issues/145)) ([aa23e78](https://github.com/MapColonies/catalog-web-app-bff/commit/aa23e7813f1777da5a8739491b0f6ced399fb159))
* bff services availability (MAPCO-3354) ([#144](https://github.com/MapColonies/catalog-web-app-bff/issues/144)) ([964d099](https://github.com/MapColonies/catalog-web-app-bff/commit/964d0993e8e07a5f6470f0d194391cfa49621b43))


### Bug Fixes

* polygon parts exposure type ([ce0b4e2](https://github.com/MapColonies/catalog-web-app-bff/commit/ce0b4e21ab18898b9a2e12e4645bb8b9dfc1b847))
* update build_and_push.yaml ([df28316](https://github.com/MapColonies/catalog-web-app-bff/commit/df28316ebe4d335bf38785cb3931708294505741))
* wfs services config icons ([b107eb4](https://github.com/MapColonies/catalog-web-app-bff/commit/b107eb4d3d38df694cc4e70b3f5a2354a75b10b7))

## [1.16.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.15.2...v1.16.0) (2023-06-25)


### Features

* ability to define service exposure ([#143](https://github.com/MapColonies/catalog-web-app-bff/issues/143)) ([a38d7a2](https://github.com/MapColonies/catalog-web-app-bff/commit/a38d7a24e951478585ee21bb69e08575e3e108a9))

### [1.15.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.15.1...v1.15.2) (2023-06-25)

### [1.15.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.15.0...v1.15.1) (2023-04-18)


### Bug Fixes

* remove dem map server from external services ([#142](https://github.com/MapColonies/catalog-web-app-bff/issues/142)) ([6a1d8b0](https://github.com/MapColonies/catalog-web-app-bff/commit/6a1d8b0667ca95b2adc4f56da20c5e6b2a10b025))

## [1.15.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.14.1...v1.15.0) (2023-04-13)


### Features

* new dem profile sync and update ui aspects and fields ([#141](https://github.com/MapColonies/catalog-web-app-bff/issues/141)) ([e8f9103](https://github.com/MapColonies/catalog-web-app-bff/commit/e8f9103a8a81e76ceeec7b9450b8da0c8d1b5290))

### [1.14.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.14.0...v1.14.1) (2023-03-27)


### Bug Fixes

* dependencies errors ([9129729](https://github.com/MapColonies/catalog-web-app-bff/commit/9129729c08960dba2b56ec449628d941e0ec9866))

## [1.14.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.13.4...v1.14.0) (2023-03-27)


### Features

* add custom tables request for lookup tables resolver ([#138](https://github.com/MapColonies/catalog-web-app-bff/issues/138)) ([ec16a3c](https://github.com/MapColonies/catalog-web-app-bff/commit/ec16a3cfc05ff276ed5ef1cef037d9f56515ef5f))

### [1.13.4](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.13.3...v1.13.4) (2023-01-29)


### Bug Fixes

* ptoduct type freeze on update ([#137](https://github.com/MapColonies/catalog-web-app-bff/issues/137)) ([d7d267d](https://github.com/MapColonies/catalog-web-app-bff/commit/d7d267daed07c655b39c294652a623760bf03429))

### [1.13.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.13.1...v1.13.2) (2023-01-17)


### Bug Fixes

* add lookup table service value ([#135](https://github.com/MapColonies/catalog-web-app-bff/issues/135)) ([ce3c6e6](https://github.com/MapColonies/catalog-web-app-bff/commit/ce3c6e6d049ad1e021a6e9fdb5bd345a5b6e9be5))

### [1.13.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.13.0...v1.13.1) (2023-01-17)


### Bug Fixes

* job manager common template ([#134](https://github.com/MapColonies/catalog-web-app-bff/issues/134)) ([77ab5c6](https://github.com/MapColonies/catalog-web-app-bff/commit/77ab5c63c6b0f5fc87d95f4dc08f55219b339c70))

## [1.13.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.12.3...v1.13.0) (2023-01-15)


### Features

* start implementing wfs client ([#128](https://github.com/MapColonies/catalog-web-app-bff/issues/128)) ([81bfdfa](https://github.com/MapColonies/catalog-web-app-bff/commit/81bfdfa1a33603765521e0564c7018a1f0c7116e))
* transparency field added to model ([#130](https://github.com/MapColonies/catalog-web-app-bff/issues/130)) ([6cbdf19](https://github.com/MapColonies/catalog-web-app-bff/commit/6cbdf19d6224fc2ef0d6a7e96649f85f2ba45374))


### Bug Fixes

* c for each error ([#131](https://github.com/MapColonies/catalog-web-app-bff/issues/131)) ([fb42aa4](https://github.com/MapColonies/catalog-web-app-bff/commit/fb42aa4da7934ff18b1351d222e7e553d10f3e50))
* cross xml array mode definition ([#133](https://github.com/MapColonies/catalog-web-app-bff/issues/133)) ([af216ff](https://github.com/MapColonies/catalog-web-app-bff/commit/af216ff1e959102f5988b4fc262398d09080241e))
* jobs available actions logic ([#132](https://github.com/MapColonies/catalog-web-app-bff/issues/132)) ([e551014](https://github.com/MapColonies/catalog-web-app-bff/commit/e551014ca1531908ff90a6bcc7221b8e9bf25552))
* merge fix ([#129](https://github.com/MapColonies/catalog-web-app-bff/issues/129)) ([f346620](https://github.com/MapColonies/catalog-web-app-bff/commit/f3466200ad400aafb83939948d7ee85c56538e2d))
* use wmts layer url from capabilities (MAPCO-2648) ([#121](https://github.com/MapColonies/catalog-web-app-bff/issues/121)) ([3578ed2](https://github.com/MapColonies/catalog-web-app-bff/commit/3578ed213414d2170add3ed1cdafb6550ef9bb87))

### [1.12.3](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.12.2...v1.12.3) (2022-11-07)


### Bug Fixes

* raster insertdate granularity ([#124](https://github.com/MapColonies/catalog-web-app-bff/issues/124)) ([840a1b7](https://github.com/MapColonies/catalog-web-app-bff/commit/840a1b74e3f493982bc279c487846233f6bbcdc0))

### [1.12.2](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.12.0...v1.12.2) (2022-11-06)


### Bug Fixes

* add insert date to records metadata ([#122](https://github.com/MapColonies/catalog-web-app-bff/issues/122)) ([8fb8c1a](https://github.com/MapColonies/catalog-web-app-bff/commit/8fb8c1a341e18ce835e75fc902465f9ebd490a52))
* all dates granularities should be set to minutes MAPCO-2637 ([#119](https://github.com/MapColonies/catalog-web-app-bff/issues/119)) ([c116ce8](https://github.com/MapColonies/catalog-web-app-bff/commit/c116ce8f6296a81ba8c6557af7fd2303b25cd38c))
* disable RasterVectorBest entity MAPCO-2551 ([#118](https://github.com/MapColonies/catalog-web-app-bff/issues/118)) ([862f670](https://github.com/MapColonies/catalog-web-app-bff/commit/862f670efe8a1063d68573d38278c3466880b4cb))
* getCapabilities should not throw unmanaged exceptions ([#115](https://github.com/MapColonies/catalog-web-app-bff/issues/115)) ([8431803](https://github.com/MapColonies/catalog-web-app-bff/commit/843180336eae9f0498e5d2a379592ca138994b4b))
* jsonObj.Capabilities.Contents.Layer.filter error ([#120](https://github.com/MapColonies/catalog-web-app-bff/issues/120)) ([ccbbba4](https://github.com/MapColonies/catalog-web-app-bff/commit/ccbbba4cb7ff60ad2b64835174921e6b1245ef1c))
* vector raster best - links should be with full width ([#114](https://github.com/MapColonies/catalog-web-app-bff/issues/114)) ([90c5e63](https://github.com/MapColonies/catalog-web-app-bff/commit/90c5e630c296fdd2b4f7d743137ea89b8ce22a67))

### [1.12.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.12.0...v1.12.1) (2022-10-03)

## [1.12.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.11.1...v1.12.0) (2022-10-03)


### Features

* 3D profile 2.0 ([#103](https://github.com/MapColonies/catalog-web-app-bff/issues/103)) ([fa24b25](https://github.com/MapColonies/catalog-web-app-bff/commit/fa24b2533b4a6fde1dc5bf1688218106bd1acb0a))
* resolve raw enums for client base concept ([#107](https://github.com/MapColonies/catalog-web-app-bff/issues/107)) ([9e44912](https://github.com/MapColonies/catalog-web-app-bff/commit/9e449126539a54ede8063f50d673d252457b1df4))


### Bug Fixes

* abort job status support + disable job actions ([#108](https://github.com/MapColonies/catalog-web-app-bff/issues/108)) ([e1c262c](https://github.com/MapColonies/catalog-web-app-bff/commit/e1c262c484bef60c3437e5ba67ea81ab5a085f99))
* mc models version ([#105](https://github.com/MapColonies/catalog-web-app-bff/issues/105)) ([8e49fd5](https://github.com/MapColonies/catalog-web-app-bff/commit/8e49fd55efdd79551e180e7bc17860b6c1d65e20))
* missing internal prop ([12c0777](https://github.com/MapColonies/catalog-web-app-bff/commit/12c07772e4d5b0c618c1fef7acf5e37e9514a514))
* missing internal prop ([#109](https://github.com/MapColonies/catalog-web-app-bff/issues/109)) ([95e793f](https://github.com/MapColonies/catalog-web-app-bff/commit/95e793fd5143ece2f558844f333990760f52f34c))

### [1.11.1](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.11.0...v1.11.1) (2022-09-05)


### Bug Fixes

* fields info layout ([#102](https://github.com/MapColonies/catalog-web-app-bff/issues/102)) ([05fb570](https://github.com/MapColonies/catalog-web-app-bff/commit/05fb570316acde06411fea8fe7856211a98a27fd))

## [1.11.0](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.10.9...v1.11.0) (2022-08-30)


### Features

* added rows option to field config and implement for description fields ([54c22c6](https://github.com/MapColonies/catalog-web-app-bff/commit/54c22c6ec9b5a398491d9f23e13b2d23b1958779))
* added rows option to field config and implement for description fields ([#101](https://github.com/MapColonies/catalog-web-app-bff/issues/101)) ([43d04e4](https://github.com/MapColonies/catalog-web-app-bff/commit/43d04e401ef720694830f5e5af92d0c3ef86453f))


### Bug Fixes

* lgtm ([#100](https://github.com/MapColonies/catalog-web-app-bff/issues/100)) ([5345872](https://github.com/MapColonies/catalog-web-app-bff/commit/5345872b4a08a1089f7b8864ea7888c113acc866))

### [1.10.9](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.10.8...v1.10.9) (2022-08-04)


### Bug Fixes

* 3d update integration ([#97](https://github.com/MapColonies/catalog-web-app-bff/issues/97)) ([5b0cb08](https://github.com/MapColonies/catalog-web-app-bff/commit/5b0cb087a269cf5b25cbce6fd4eacdd5a7f93ff8))
* missing copyable in dem ([#54](https://github.com/MapColonies/catalog-web-app-bff/issues/54)) ([74dc7ba](https://github.com/MapColonies/catalog-web-app-bff/commit/74dc7baf03dfd07af3da3668fd6089a3d12f6021))
* revert product version ([#98](https://github.com/MapColonies/catalog-web-app-bff/issues/98)) ([5ec750f](https://github.com/MapColonies/catalog-web-app-bff/commit/5ec750f10d694b71bc73be5828dab0f4b388c0fb))

### [1.10.5](https://github.com/MapColonies/catalog-web-app-bff/compare/v1.10.4...v1.10.5) (2022-05-24)


### Bug Fixes

* capabilities ([20293f8](https://github.com/MapColonies/catalog-web-app-bff/commit/20293f8bf4e3d2d2cba3bc9139d66cad8035b62b))
* developer error in case footprint has minus ninety as the second coordinate ([06443cb](https://github.com/MapColonies/catalog-web-app-bff/commit/06443cb4edc3226bbe0f4aa74290b9e6cd72ac85))
