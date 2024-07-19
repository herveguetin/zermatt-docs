# Architecture

## Overview
- Zermatt aims at providing a modern frontend stack integrated into Adobe Commerce / Magento.
- Zermatt is not a theme. It is kind of a frontend framework that acts in your Magento themes.
- Zermatt allows step-by-step enhancement of the native Magento frontend...
- ... and helps removing Knockout / RequireJS at your pace.

## Components
- A frontend stack located in the `web/zermatt` directory of your themes. Based on [ViteJS](https://vitejs.dev/) and [AlpineJS](https://alpinejs.dev/).
- A Magento module installed via Composer: `Maddlen_Zermatt` . In charge of handling integration of the frontend stack within Magento. Also contains the skeleton of the frontend stack to be deployed in your themes on install.

## Communication
1. The frontend stack generates a JS build.
2. This build exposes a `Zermatt` global object to the frontend / JS.
3. This build is added to the `<head>` of the layout.
4. The code in the `.phtml` files can use the `Zermatt` global object. 

In addition, Zermatt offers a way to pass backend data to the frontend thru the `Zermatt.Variables` JS object.

## Data Management
- Data can be passed from the backend to the frontend by using Zermatt Variables.
- Data can be passed from the frontend to the backend via AJAX / POST.
- You may implement other data exchange (ie, with external DB / backend) in the frontend stack of your theme (`your_theme_path/web/zermatt`). 

## Build
- The `Maddlen_Zermatt` Magento module is handled by native Magento `setup:di:compile`
- The frontend stack must be built (`npm run build`). With CI, or on the final server, or locally.
