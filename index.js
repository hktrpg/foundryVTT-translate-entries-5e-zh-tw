
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