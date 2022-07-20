const fs = require('fs');
class CollectionItem {
    constructor() {
        this.items = []
    }
    // create a new player and save it in the collection
    newItem(name) {
        let item = new Item(name)
        this.items.push(item)
        return item
    }
    get allItems() {
        return this.items
    }
    // this could include summary stats like average score, etc. For simplicy, just the count for now
    get numberOfItems() {
        return this.items.length
    }
}


class Item {
    constructor({ name, ENG_name, entries }) {
        this.name = name;
        this.ENG_name = ENG_name;
        this.entries = entries;
    }
}

let collectedData = [];
let collection = new CollectionItem();
function readFolderJson(folder) {
    let files = fs.readdirSync(folder);
    let data = [];
    files.forEach(file => {
        if (file.includes('.json')) {
            let json = JSON.parse(fs.readFileSync(folder + '/' + file, 'utf8'));
            data.push(json);
        }
    })
    return data;
}


function searchTargetKey(obj, keys) {
    if (keys.includes('name') && keys.includes('ENG_name') && keys.includes('entries')) {
        collection.newItem({ name: obj['name'], ENG_name: obj['ENG_name'], entries: obj['entries'] });
    }
}

function handlingObject(data) {
    const keys = findObjectKey(data);
    //  console.log(keys);
    searchTargetKey(data, keys);//搜索所有object有沒有三個指定的key
    keys.forEach(key => {
        if (data[key] instanceof Array) {
            data[key].forEach(item => {
                // console.log('item: ' + JSON.stringify(item));
                handlingObject(item);
            })
        }
        if (data[key] instanceof Object) {
            //  console.log('object: ' + JSON.stringify(data[key]));
            handlingObject(data[key]);
        }
    })
}

init()

function init() {
    //   const data = readFolderJson('data');    // read all json files
    const datas = readFolderJson('data'); //讀取所有資料庫.JSON檔案

    datas.forEach(data => {
        //  console.log('data: ' + JSON.stringify(data));
        handlingObject(data)
    })

    console.log(collection.numberOfItems)
    //  console.log(JSON.stringify(collection.allItems))


}

function findObjectKey(object) {
    try {
        const keys = Object.keys(object);
        return keys;
    } catch (error) {
        return {}
    }

}






/**
 * 1. 讀取所有資料庫.JSON
 *      i. 找出所有object 及 array
 *      ii. 找出所有object 及 array 的名稱
 *      iii. 找出同時擁有name eng_name及entries的object
 * 2. 放進class: classes, items, spells, feats
 * 3. 讀取FVTT 角色卡資料
 * 4. 對比 角色卡資料和資料庫資料
 * 5. 取代角色卡資料
 * 
 */