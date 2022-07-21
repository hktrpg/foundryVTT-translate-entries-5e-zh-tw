
console.log('start')
let flag = {
    zh_tw: true,
    all_players: true
}
class CollectionItem {
    constructor() {
        this.items = []
    }
    // create a new player and save it in the collection
    newItem(detail) {
        if (collection.allItemsName.includes(detail.name) || detail.ENG_name === "At Higher Levels") return;
        let item = new FiveEToolsItem(detail)
        this.items.push(item)
        return item
    }
    get allItems() {
        return this.items
    }
    get allItemsName() {
        return this.items.map(item => item.name)
    }
    targetItem(name) {
        return this.items.find(item => item.ENG_name === name)
    }
    // this could include summary stats like average score, etc. For simplicy, just the count for now
    get numberOfItems() {
        return this.items.length
    }
}


class FiveEToolsItem {
    constructor({ name, ENG_name, entries }) {
        this.name = name;
        this.ENG_name = ENG_name;
        this.entries = entries.join("\n");
    }
}


async function getJsonData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function readFolderJson(folder) {
    const folderList = await FilePicker.browse("data", `modules/translate_entries_5e` + folder)
    let files = folderList.files;
    console.log('folderList', files)
    let data = await getJsonData(files[0])
    return data;


}


function searchTargetKey(obj, keys) {
    try {
        if (keys.includes('name') && keys.includes('ENG_name') && keys.includes('entries')) {
            collection.newItem({ name: obj['name'], ENG_name: obj['ENG_name'], entries: obj['entries'] });
        }
    } catch (error) {
        return;
    }

}

function handlingObject(data) {
    const keys = findObjectKey(data);
    //console.log('keys', keys)
    searchTargetKey(data, keys);//搜索所有object有沒有三個指定的key
    keys.forEach(key => {
        if (data[key] instanceof Array) {
            data[key].forEach(item => {
                handlingObject(item);
            })
        }
        if (data[key] instanceof Object) {
            handlingObject(data[key]);
        }
    })
}
function handlingdatas(datas) {
    //console.log('datas', datas)
    datas.feat.forEach(data => {
        handlingObject(data)
    })
}
async function loadingJson() {
    let datas = await readFolderJson('/data')
    // datas.push(readFolderJson('/data'))
    // datas.push(readFolderJson('/data/spells'))
    // datas.push(readFolderJson('/data/class'))

    //        console.log('loadingJson', datas)

    return datas;
}

function findObjectKey(object) {
    try {
        const keys = Object.keys(object);
        return keys;
    } catch (error) {
        return []
    }

}
function findActor(name) {
    return game.actors.find(actor => actor.name === name)
}



function translateItems(name) {
    let actor = findActor(name)
    actor.data.items.forEach(item => {
        let actorItem = collection.targetItem(item.name);
        if (actorItem) {
            console.log(actorItem.entries)
            item.data.data.description.value = actorItem.entries;
        }
    })

}


async function init() {
    let datas = await loadingJson();
    console.log('init', datas)
    handlingdatas(datas);
    //console.log(JSON.stringify(collection.allItemsName))
    translateItems('QAQ')
}

const collection = new CollectionItem();
Hooks.once('ready', () => {
    console.log('ready translate')
    init()
});



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

/**
 * 
 * 
 * // https://jsonplaceholder.typicode.com - Provides test JSON data
var urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

// Maps each URL into a fetch() Promise
var requests = urls.map(function(url){
  return fetch(url)
  .then(function(response) {
// throw "uh oh!";  - test a failure
return response.json();
  })  
});

// Resolve all the promises
Promise.all(requests)
.then((results) => {
  console.log(JSON.stringify(results, null, 2));
}).catch(function(err) {
  console.log("returns just the 1st failure ...");
  console.log(err);
})
 */