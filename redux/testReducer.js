import { 
    TEST_SAGA,
    UPDATE_DATA
} from "./constants";

let reducer = {
    test : {},

     // errorModal
     errorModalInfo : {
        showModal : false,
        title : "",
        message : "",
        buttonText : "",
        onClose : ""
    },

    // confirmModal
    confirmModalInfo : {
        showModal : false,
        title : "",
        message : "",
        primaryText : "",
        primaryAction : "",
        secondaryText : "",
        secondaryAction : ""
    },

    // carousel
    carouselData : {
        show : false,
        imageList : []
    },

    // loading
    loading : {
        show : false
    },

    camera : {
        show : false
    },

    sidebar : {
        show : false
    },

    userInfo : {},

    isDriverOn : false,
};

export default (state = reducer, action) => {
    switch (action.type) {
        case TEST_SAGA:
            return Object.assign({}, state, { test: action.payload });
        case UPDATE_DATA:
            return { ...state, ...action.data };
        default:
            return state;
    }
};