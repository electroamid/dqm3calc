let CompleteFlag = false;
let grandParent1 = "";
let grandParent2 = "";
let grandParent3 = "";
let grandParent4 = "";
let parent1 = "";
let parent2 = "";
let parentLevelAvarage = 0;
let childSize = "s";
let actionPerTurn = 1;
let monsterId = 0;
let hMagni = 0;
let mMagni = 0;
let aMagni = 0;
let dMagni = 0;
let wMagni = 0;
let sMagni = 0;
let h = 0;
let m = 0;
let a = 0;
let d = 0;
let w = 0;
let s = 0;
let hReal = 0;
let mReal = 0;
let aReal = 0;
let dReal = 0;
let wReal = 0;
let sReal = 0;
let monsterData = null;
let typeData = null;

window.onload = function () {

    const url = "./monster_data.json";
    const url2 = "./typeCollection.json";

    fetch(url)
        .then(response => response.json())
        .then(data => setMonsters(data))

    fetch(url2)
        .then(response => response.json())
        .then(data => setTypeData(data))

    //const labels = document.getElementsByClassName('input-label');

    // for (let i=0; i < labels.length; i++) {
    //     labels[i].addEventListener('click', function () {

    //         console.log('クリックされました！');

    //     }, false);
    // }

    const button = document.getElementById("calc-button");

    button.addEventListener("click", function () {
        CompleteFlag = true;
        grandParent1 = checkRadioValue("grand-parent1");
        grandParent2 = checkRadioValue("grand-parent2");
        grandParent3 = checkRadioValue("grand-parent3");
        grandParent4 = checkRadioValue("grand-parent4");
        parent1 = checkRadioValue("parent1");
        parent2 = checkRadioValue("parent2");
        childSize = checkRadioValue("child-size");
        actionPerTurn = checkSelectValue("action-per-turn");
        getMonsterInfo();
        getLevelAvarage();
        if (!CompleteFlag) {
            document.getElementById("h").innerHTML = "-";
            document.getElementById("m").innerHTML = "-";
            document.getElementById("a").innerHTML = "-";
            document.getElementById("d").innerHTML = "-";
            document.getElementById("w").innerHTML = "-";
            document.getElementById("s").innerHTML = "-";
            alert("選択されていない項目、存在しない値があります。");
            return false;
        }
        mergeStatusMagni(typeData);
        calcStatus();
        setStatus();
    }, false)

    const searchCondition = document.getElementById("search-condition");
    const searchLankButtons = document.getElementsByName("child-search-lank")

    for(searchLankButton of searchLankButtons){
        searchLankButton.addEventListener("click", function(e){
            searchCondition.classList.toggle(e.currentTarget.value);
            if(["X","S","A","B","C","D","E","F","G"].every(c=>searchCondition.classList.contains(c) )){
                searchCondition.classList.add("any-lank");
            }
            else{
                searchCondition.classList.remove("any-lank");
            }
        },false);
    }

    const searchTypeButtons = document.getElementsByName("child-search-type");

    for(searchTypeButton of searchTypeButtons){
        searchTypeButton.addEventListener("click", function(e){
            searchCondition.classList.toggle(e.currentTarget.value);
            if(["slime","dragon","natural","beast","material","daemon","zombie","unknown"].every(c=>searchCondition.classList.contains(c) )){
                searchCondition.classList.add("any-type");
            }
            else{
                searchCondition.classList.remove("any-type");
            }
        },false);
    }
}

function setMonsters(json) {
    const childSpeciesInput = document.getElementById("child-species");
    monsterData = json;

    for (monster of json) {
        let option = document.createElement("option");
        option.text = monster.name;
        option.value = monster.name;
        option.className = monster.lank + "-lank" + " " + monster.type+"-type";
        childSpeciesInput.appendChild(option);
    }
}

function setTypeData(json) {
    typeData = json;
}

function checkRadioValue(targetName) {
    let flag = false;
    let targetValue = "";
    const target = document.getElementsByName(targetName);

    for (let i = 0; i < target.length; i++) {

        if (target[i].checked) {
            flag = true;
            targetValue = target[i].value;
            return targetValue;
        }
    }

    if (!flag) {
        CompleteFlag = false;
        return false;
    }
}

function getLevelAvarage() {
    let parent1Level = parseInt(document.getElementById("parent1-level").value);
    let parent2Level = parseInt(document.getElementById("parent2-level").value);

    if (parent1Level > 100 || parent2Level > 100 || parent1Level < 10 || parent2Level < 10) {
        CompleteFlag = false;
        return false;
    }
    parentLevelAvarage = (parent1Level + parent2Level) / 2;
}

function getMonsterInfo() {
    const SelectedId = document.getElementById("child-species").selectedIndex;

    if (SelectedId) {
        h = monsterData[SelectedId -1].h;
        m = monsterData[SelectedId -1].m;
        a = monsterData[SelectedId -1].a;
        d = monsterData[SelectedId -1].d;
        w = monsterData[SelectedId -1].w;
        s = monsterData[SelectedId -1].s;
    }
    else {
        CompleteFlag = false;
        return false;
    }
}

function checkSelectValue() {
    const targetSelect = document.getElementById('action-per-turn');
    if (targetSelect[targetSelect.selectedIndex].value !== "") {
        return targetSelect[targetSelect.selectedIndex].value;
    }
    else {
        CompleteFlag = false;
        return false;
    }
}

function mergeStatusMagni(json) {
    let hPlus = 0;
    let mPlus = 0;
    let aPlus = 0;
    let dPlus = 0;
    let wPlus = 0;
    let sPlus = 0;

    let grandParentInfo1 = json[grandParent1];
    let grandParentInfo2 = json[grandParent2];
    let grandParentInfo3 = json[grandParent3];
    let grandParentInfo4 = json[grandParent4];
    let ParentInfo1 = json[parent1];
    let ParentInfo2 = json[parent2];

    hPlus = 2 * (grandParentInfo1.h + grandParentInfo2.h + grandParentInfo3.h + grandParentInfo4.h) + 4 * (ParentInfo1.h + ParentInfo2.h);
    mPlus = 2 * (grandParentInfo1.m + grandParentInfo2.m + grandParentInfo3.m + grandParentInfo4.m) + 4 * (ParentInfo1.m + ParentInfo2.m);
    aPlus = 2 * (grandParentInfo1.a + grandParentInfo2.a + grandParentInfo3.a + grandParentInfo4.a) + 4 * (ParentInfo1.a + ParentInfo2.a);
    dPlus = 2 * (grandParentInfo1.d + grandParentInfo2.d + grandParentInfo3.d + grandParentInfo4.d) + 4 * (ParentInfo1.d + ParentInfo2.d);
    wPlus = 2 * (grandParentInfo1.w + grandParentInfo2.w + grandParentInfo3.w + grandParentInfo4.w) + 4 * (ParentInfo1.w + ParentInfo2.w);
    sPlus = 2 * (grandParentInfo1.s + grandParentInfo2.s + grandParentInfo3.s + grandParentInfo4.s) + 4 * (ParentInfo1.s + ParentInfo2.s);

    if (grandParent1 != grandParent2 && grandParent1 != grandParent3 && grandParent1 != grandParent4 && grandParent2 != grandParent3 && grandParent2 != grandParent4 && grandParent3 != grandParent4) {
        hPlus += 4;
        mPlus += 4;
        aPlus += 4;
        dPlus += 4;
        wPlus += 4;
        sPlus += 4;
    }

    hMagni = (100 + hPlus / 100 * parentLevelAvarage) / 100;
    mMagni = (100 + mPlus / 100 * parentLevelAvarage) / 100;
    aMagni = (100 + aPlus / 100 * parentLevelAvarage) / 100;
    dMagni = (100 + dPlus / 100 * parentLevelAvarage) / 100;
    wMagni = (100 + wPlus / 100 * parentLevelAvarage) / 100;
    sMagni = (100 + sPlus / 100 * parentLevelAvarage) / 100;
}

function calcStatus() {
    let hSizeMagni = 1;
    let mSizeMagni = 1;
    let aSizeMagni = 1;
    let dSizeMagni = 1;
    let wSizeMagni = 1;
    let sSizeMagni = 1;

    if (childSize == "L") {
        hSizeMagni = 1.5;
        mSizeMagni = 1.5;
        aSizeMagni = 1.1;
        dSizeMagni = 1.1;
        wSizeMagni = 1.1;
        sSizeMagni = 1.1;
    }

    hReal = Math.floor(h * hSizeMagni * actionPerTurn * hMagni);
    mReal = Math.floor(m * mSizeMagni * actionPerTurn * mMagni);
    aReal = Math.floor(a * aSizeMagni * actionPerTurn * aMagni);
    dReal = Math.floor(d * dSizeMagni * actionPerTurn * dMagni);
    wReal = Math.floor(w * wSizeMagni * actionPerTurn * wMagni);
    sReal = Math.floor(s * sSizeMagni * actionPerTurn * sMagni);
}

function setStatus() {
    document.getElementById("h").innerHTML = hReal;
    document.getElementById("m").innerHTML = mReal;
    document.getElementById("a").innerHTML = aReal;
    document.getElementById("d").innerHTML = dReal;
    document.getElementById("w").innerHTML = wReal;
    document.getElementById("s").innerHTML = sReal;
}