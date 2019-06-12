/* eslint-disable */
import axios from 'axios';

export default {
    //state 屬於區域變數
    //actions,mutations,getters 屬於全域變數
    namespaced:true, //加入這行後actions,mutations,getters 變為區域變數
    state: {
        products: [],
        categories: [],
    },
    actions: {
        getProducts(context) {
            // const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            // vm.$store.state.isLoading = true;
            // vm.$store.dispatch('updateLoading', true);
            context.commit('LOADING', true,{root:true});
            axios.get(url).then((response) => {
                context.commit('PRODUCTS', response.data.products);
                context.commit('CATEGORIES', response.data.products);
                console.log('取得產品列表:', response);
                // vm.$store.state.isLoading = false;
                //   vm.$store.dispatch('updateLoading', false);
                context.commit('LOADING', false,{root:true});
            });
        },
    },
    mutations: {
        PRODUCTS(state, payload) {
            state.products = payload;
        },
        CATEGORIES(state, payload) {
            // const vm = this;
            const categories = new Set();
            payload.forEach((item) => {
                categories.add(item.category);
            });
            state.categories = Array.from(categories);
        },
    },
    getters:{
        categories(state) {
            return state.categories;
          },
          products(state) {
            return state.products;
          },
    },
}