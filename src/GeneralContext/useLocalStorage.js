import React from 'react';

function useLocalStorage(){
    const saveItem = (itemName,item)=>{
        console.log('item before: '+item)
        const stringifiedItem = JSON.stringify(item)
        localStorage.setItem(itemName,stringifiedItem)
        console.log('NOW: ',stringifiedItem)
    }
    const getItem = (itemName)=>{
        const item = localStorage.getItem(itemName)
        JSON.parse(item)
        console.log(item)
    }
    return {
        saveItem, getItem
    }
}

export {useLocalStorage}