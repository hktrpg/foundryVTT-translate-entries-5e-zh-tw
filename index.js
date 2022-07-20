
Hooks.once('init', () => {


});

Hooks.once('ready', () => {

});
Hooks.on("renderSidebarTab", (dialog, $element, targets) => {

});

Hooks.on("chatMessage", (dialog, $element, targets) => {
    let namelist = document.getElementById('namelist');
    let checked = document.getElementById("speakerSwitch").checked;
    if (!checked) return;
    if (!namelist) return;
    switch (namelist.value) {
        case 'userName':
            targets.speaker.actor = null;
            targets.speaker.token = null;
            targets.speaker.alias = null;
            break;
        default:
            let map = game.scenes.find(scene => scene.isView);
            let target = map.tokens.find(token => {
                return token.name == namelist.options[namelist.selectedIndex].text
            })
            if (!target) {
                targets.speaker.token = 'Speak As zzzz';
                targets.speaker.alias = namelist.options[namelist.selectedIndex].text;
            }
            if (target) {
                targets.speaker.token = target.id;
                targets.speaker.alias = namelist.options[namelist.selectedIndex].text;
            }
            break;
    }

});


class data {
    constructor(name, eng_name, entries) {
        this.name = name;
        this.eng_name = eng_name;
        this.entries = entries;
    }
}

class classes extends data {

}

class items extends data {

}
class spells extends data {

}
class feats extends data {

}

function readFolderJson(folder) {
    let files = fs.readdirSync(folder);
    let data = [];
    files.forEach(file => {
        let json = JSON.parse(fs.readFileSync(folder + '/' + file, 'utf8'));
        data.push(json);
    })
    return data;
}

function findAllArray(array, key, value) {
    let result = [];
    array.forEach(item => {
        if (item[key] == value) {
            result.push(item);
        }
    })
    return result;
}

function findObjectKey(object) {

}



const testData = {
    "spell": [
        {
            "name": "黑暗星辰",
            "ENG_name": "Dark Star",
            "source": "EGW",
            "page": 186,
            "level": 8,
            "school": "V",
            "time": [
                {
                    "number": 1,
                    "unit": "action"
                }
            ],
            "range": {
                "type": "point",
                "distance": {
                    "type": "feet",
                    "amount": 150
                }
            },
            "components": {
                "v": true,
                "s": true,
                "m": {
                    "text": "一小块碎玛瑙与一滴施法者的血液，在施法时被消耗。",
                    "consume": true
                }
            },
            "duration": [
                {
                    "type": "timed",
                    "duration": {
                        "type": "minute",
                        "amount": 1
                    },
                    "concentration": true
                }
            ],
            "entries": [
                "该法术在施法距离内以你选择的一点为圆心创造一个球形范围。该圆形半径至多为40尺。区域内充斥着魔法黑暗与毁灭性的重力能量。",
                "法术持续时间内，球形区域内视为困难地形。一个拥有黑暗视觉的生物没法看透这片魔法黑暗，非魔法的光源无法点亮这片区域。该区域内没法发出声音，声音也没办法穿过该区域。任何完全处于该区域内的生物或物件免疫雷鸣伤害，并且生物完全处于该区域内时处于{@condition 耳聋}状态。在该法术的影响范围内没有办法施展需要语言成分的法术。",
                "任何在自己回合中第一次进入该区域的生物或在该区域内开始其回合的生物需要进行一次体质豁免。若豁免失败，该生物受到{@damage 8d10}力场伤害，成功则只受到一半伤害。当一个生物的HP被这个法术降低到0时，该生物被解离。被解离的生物与其身上穿着的，携带着的一切，除了魔法物品外，都会化为一缕灰色的烟尘。"
            ],
            "damageInflict": [
                "force"
            ],
            "conditionInflict": [
                "deafened"
            ],
            "savingThrow": [
                "constitution"
            ],
            "areaTags": [
                "S"
            ],
            "classes": {
                "fromSubclass": [
                    {
                        "class": {
                            "name": "Wizard",
                            "source": "PHB"
                        },
                        "subclass": {
                            "name": "Graviturgy",
                            "source": "EGW"
                        }
                    }
                ]
            },
            "hasFluffImages": true
        }]
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