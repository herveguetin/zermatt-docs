import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually
    tutorialSidebar: [
        'getting-started',
        'architecture',
        {
            type: 'category',
            label: 'Features',
            items: [
                'features/modules'
            ],
        },
        {
            type: 'category',
            label: 'Examples',
            items: [
                'examples/zermatt-examples',
                'examples/module-rewrite',
                'examples/passing-data',
                'examples/zermatt-components',
            ],
        },
        'deployment',
        'update',
        'contributing'
    ],
};

export default sidebars;
