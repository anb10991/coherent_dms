import englishMessages from 'ra-language-english';
import treeEnglishMessages from 'ra-tree-language-english';
import { mergeTranslations } from 'react-admin';

export const messages = {
    ...mergeTranslations(englishMessages, treeEnglishMessages),
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Reset views',
        },
        'create-post': 'New post',
    },
    global: {
        button: {
            action: {
                save_and_edit: 'Save and Edit',
                save_and_add: 'Save and Add',
                save_and_show: 'Save and Show',
                save_with_average_note: 'Save with Note',
                save_and_continue: 'Save and Continue',
            }
        }
    },
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            welcome: {
                title: 'Welcome to react-admin demo',
                subtitle:
                    "This is the admin of an imaginary poster shop. Fell free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                aor_button: 'react-admin site',
                demo_button: 'Source for this demo',
            },
        },
        menu: {
            articles: 'Articles',
        },
    },
    resources: {
        masterDocuments: {
            name: 'Master Document |||| Master Documents',
        },
        categories: {
            name: 'Category |||| Categories',
        },
        documents: {
            name: 'Document |||| Documents',
        },
        textentries: {
            name: 'Text Entry |||| Text Entries',
        },
        articles: {
            name: 'Article |||| Articles',
        },
        forms: {
            name: 'Form |||| Forms',
        },
        users: {
            name: 'User |||| Users',
            fields: {
                occupation: 'Job Title',
                fullname: 'Full Name',
                username: 'User Name',
            }
        },
    },

    category: {
        list: {
            search: 'Search',
        },
        form: {
            summary: 'Summary',
            articles: 'Articles',
        },
        edit: {
            title: '%{title}',
        },
        action: {
            save_and_edit: 'Save and Edit',
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
            save_with_average_note: 'Save with Note',
        },
    },

    document: {
        title: 'Document - "%{title}"',
        form: {
            summary: 'Summary',
            category: 'Category',
            revisions: 'Revisions',
        },
        show: {
            revision: {
                content: 'URL',
            }
        }
    },

    textentry: {
        title: 'TextEntry - "%{title}"',
        form: {
            summary: 'Summary',
            category: 'Category',
            revisions: 'Revisions',
        },
        show: {
            revision: {
                content: 'Content',
            }
        }
    },

    form: {
        title: 'Form - "%{title}"',
        form: {
            summary: 'Summary',
            category: 'Category',
            submissions: 'Submissions',
        },
        show: {
            revision: {
                content: 'Submition',
            }
        }
    },

    user: {
        list: {
            search: 'Search',
        },
        form: {
            summary: 'Summary',
            security: 'Security',
        },
        edit: {
            title: 'User "%{title}"',
        },
        action: {
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
        },
    },

    revision : {
        form : {
            summary: 'Sumary',
        }
    }
};

export default messages;
