export default {
    image: {
        uploadItem: '/Api/Images/add',
        getItemList: '/Api/Images/list',
        getItem: '/Api/Images',
        deleteItem: '/Api/Images/delete',
        updateItem: '/Api/Images/updateDate',
    },

    video: {
        uploadItem: '/Api/Videos/add',
        getItemList: '/Api/Videos/list',
        getItem: '/Api/Videos',
        deleteItem: '/Api/Videos/delete',
        updateItem: '/Api/Videos/updateDate',
    },

    file: {
        uploadItem: '/Api/Files/add',
        getItemList: '/Api/Files/list',
        getItem: '/Api/Files',
        addItem: '/Api/Files/folder/add',
    },

    user: {
        login: '/Api/User/login',
        updateItem: '/Api/User/update',
        getItemList: '/Api/User/list',
    },
};

export class IServiceList {
    uploadItem?: string;
    getItemList?: string;
    getItem?: string;
    deleteItem?: string;
    updateItem?: string;
    addItem?: string;
}
