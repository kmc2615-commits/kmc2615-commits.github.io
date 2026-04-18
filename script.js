const SAVE_KEY = "otome-star-letter-save";

const state = {
  sceneId: "start",
  scores: {
    ren: 0,
    aoi: 0
  },
  backlog: []
};

const scenes = {
  start: {
    speaker: "主人公",
    text: "放課後の教室。文化祭実行委員のあなたは、机の上に置かれた差出人不明の手紙を見つけた。",
    focus: "none",
    choices: [
      { text: "手紙を開けてみる", next: "letter" },
      { text: "まずは廊下の様子を見る", next: "hallway" }
    ]
  },
  letter: {
    speaker: "手紙",
    text: "「星が見える場所で、君に伝えたいことがあります。文化祭前夜、屋上で待っています」",
    focus: "none",
    choices: [
      { text: "まっすぐな字。蓮くんっぽいかも", next: "ren_intro", score: { ren: 1 } },
      { text: "少し詩的な文章。蒼先輩かな", next: "aoi_intro", score: { aoi: 1 } }
    ]
  },
  hallway: {
    speaker: "主人公",
    text: "廊下には、軽音部の音と美術室の絵の具の香りが混ざっている。誰に相談しよう？",
    focus: "none",
    choices: [
      { text: "同じクラスの蓮に相談する", next: "ren_intro", score: { ren: 1 } },
      { text: "美術部の蒼先輩を探す", next: "aoi_intro", score: { aoi: 1 } }
    ]
  },
  ren_intro: {
    speaker: "蓮",
    text: "「困った顔してる。文化祭の準備？ 俺でよければ手伝うよ」蓮は少し照れながら、あなたの手元をのぞき込む。",
    focus: "ren",
    choices: [
      { text: "一緒に手紙の差出人を探してほしい", next: "ren_route", score: { ren: 2 } },
      { text: "蓮も忙しいよね、と遠慮する", next: "aoi_cross", score: { aoi: 1 } }
    ]
  },
  aoi_intro: {
    speaker: "蒼",
    text: "「その便せん、屋上から見える星座を描いた紙だね」蒼先輩は穏やかに笑い、絵筆を置いた。",
    focus: "aoi",
    choices: [
      { text: "先輩の観察力を頼りにする", next: "aoi_route", score: { aoi: 2 } },
      { text: "自分でも考えてみます、と笑う", next: "ren_cross", score: { ren: 1 } }
    ]
  },
  ren_cross: {
    speaker: "蓮",
    text: "「一人で抱え込むなよ」帰り道、蓮があなたの歩幅に合わせてくれる。その優しさが胸に残った。",
    focus: "ren",
    choices: [
      { text: "蓮に素直にありがとうと伝える", next: "ren_route", score: { ren: 2 } },
      { text: "蒼先輩の話も聞いてみたい", next: "aoi_route", score: { aoi: 1 } }
    ]
  },
  aoi_cross: {
    speaker: "蒼",
    text: "「誰かの想いを探すなら、まず自分の気持ちも見ないとね」蒼先輩の言葉は静かに胸へ落ちた。",
    focus: "aoi",
    choices: [
      { text: "蒼先輩にもう少し相談する", next: "aoi_route", score: { aoi: 2 } },
      { text: "蓮にも本音を話したい", next: "ren_route", score: { ren: 1 } }
    ]
  },
  ren_route: {
    speaker: "蓮",
    text: "「俺、文化祭のステージで君に一番に見てほしい曲があるんだ」蓮の声はいつもより真剣だった。",
    focus: "ren",
    choices: [
      { text: "ステージ準備を手伝う", next: "festival_eve", score: { ren: 2 } },
      { text: "屋上の星座飾りを優先する", next: "festival_eve", score: { aoi: 1 } }
    ]
  },
  aoi_route: {
    speaker: "蒼",
    text: "「星座の飾り、君と作れたら完成する気がする」蒼先輩は青い絵の具で、小さな星を描き足した。",
    focus: "aoi",
    choices: [
      { text: "飾り作りに最後まで付き合う", next: "festival_eve", score: { aoi: 2 } },
      { text: "体育館の音響も気になる", next: "festival_eve", score: { ren: 1 } }
    ]
  },
  festival_eve: {
    speaker: "主人公",
    text: "文化祭前夜。屋上には星座飾りが揺れ、体育館からはリハーサルの音が聞こえる。あなたは誰のもとへ向かう？",
    focus: "none",
    choices: [
      { text: "体育館の蓮に会いに行く", next: "ren_confession", score: { ren: 2 } },
      { text: "屋上の蒼先輩に会いに行く", next: "aoi_confession", score: { aoi: 2 } },
      { text: "二人に感謝を伝えるため中庭へ", next: "friendship" }
    ]
  },
  ren_confession: {
    speaker: "蓮",
    text: "「あの手紙、俺が書いた。格好つけすぎたけど、本当は君ともっと一緒にいたかっただけなんだ」",
    focus: "ren",
    choices: [
      { text: "蓮の気持ちに応える", next: "ending_ren" },
      { text: "少し時間がほしいと伝える", next: "ending_bittersweet" }
    ]
  },
  aoi_confession: {
    speaker: "蒼",
    text: "「手紙を書いたのは僕。君が星を見上げる横顔を、ずっと絵にしたかった」蒼先輩の声は夜風みたいに優しい。",
    focus: "aoi",
    choices: [
      { text: "蒼先輩の手を取る", next: "ending_aoi" },
      { text: "少し時間がほしいと伝える", next: "ending_bittersweet" }
    ]
  },
  friendship: {
    speaker: "主人公",
    text: "誰か一人を選ぶ前に、今は文化祭を成功させたい。そう思えたあなたは、二人に笑顔で感謝を伝えた。",
    focus: "none",
    choices: [
      { text: "エンディングへ", next: "ending_friendship" }
    ]
  },
  ending_ren: {
    speaker: "蓮",
    text: "ステージの一曲目が終わる。蓮は客席のあなたを見つけて笑った。二人の放課後は、ここから新しいイントロを奏でる。",
    focus: "ren",
    ending: {
      number: "END 01",
      type: "GOOD END",
      title: "君だけに鳴るイントロ"
    }
  },
  ending_aoi: {
    speaker: "蒼",
    text: "屋上の星座飾りの下で、蒼先輩はあなたの横顔をスケッチした。完成した絵の題名は「初恋の星」。",
    focus: "aoi",
    ending: {
      number: "END 02",
      type: "GOOD END",
      title: "初恋の星"
    }
  },
  ending_bittersweet: {
    speaker: "主人公",
    text: "すぐに答えは出せない。それでも、向き合えた気持ちは消えない。文化祭の夜空に、小さな約束だけが残った。",
    focus: "none",
    ending: {
      number: "END 03",
      type: "BITTERSWEET END",
      title: "答えは夜空の先に"
    }
  },
  ending_friendship: {
    speaker: "主人公",
    text: "文化祭は大成功。恋の答えはまだ先でも、あなたの周りには確かな絆がある。青春は、選ぶ前から輝いていた。",
    focus: "none",
    ending: {
      number: "END 04",
      type: "NORMAL END",
      title: "輝く放課後"
    }
  }
};

const titleScreen = document.querySelector("#titleScreen");
const gameScreen = document.querySelector("#gameScreen");
const startButton = document.querySelector("#startButton");
const continueButton = document.querySelector("#continueButton");
const speakerName = document.querySelector("#speakerName");
const endingBadge = document.querySelector("#endingBadge");
const dialogueText = document.querySelector("#dialogueText");
const choices = document.querySelector("#choices");
const renMeter = document.querySelector("#renMeter");
const aoiMeter = document.querySelector("#aoiMeter");
const renScore = document.querySelector("#renScore");
const aoiScore = document.querySelector("#aoiScore");
const characterRen = document.querySelector("#characterRen");
const characterAoi = document.querySelector("#characterAoi");
const backlogModal = document.querySelector("#backlogModal");
const backlogList = document.querySelector("#backlogList");
const endingModal = document.querySelector("#endingModal");
const endingModalTitle = document.querySelector("#endingModalTitle");
const endingModalType = document.querySelector("#endingModalType");
const toast = document.querySelector("#toast");

let toastTimer = null;

function startGame(reset = true) {
  if (reset) {
    state.sceneId = "start";
    state.scores.ren = 0;
    state.scores.aoi = 0;
    state.backlog = [];
  }

  titleScreen.classList.remove("is-active");
  gameScreen.classList.add("is-active");
  renderScene();
}

function renderScene() {
  const scene = scenes[state.sceneId];

  speakerName.textContent = scene.speaker;
  dialogueText.textContent = scene.text;
  choices.innerHTML = "";
  setCharacterFocus(scene.focus);
  updateMeters();
  updateEndingBadge(scene.ending);
  addBacklog(scene);

  if (scene.ending) {
    showEndingModal(scene.ending);
    return;
  }

  scene.choices.forEach((choice) => {
    choices.append(createChoiceButton(choice.text, () => choose(choice)));
  });
}

function updateEndingBadge(ending) {
  if (!ending) {
    endingBadge.hidden = true;
    endingBadge.innerHTML = "";
    return;
  }

  endingBadge.hidden = false;
  endingBadge.innerHTML = `
    <span>${ending.number} / ${ending.type}</span>
    <strong>${ending.title}</strong>
  `;
}

function showEndingModal(ending) {
  endingModalTitle.textContent = ending.title;
  endingModalType.textContent = `${ending.number} / ${ending.type}`;

  if (!endingModal.open) {
    endingModal.showModal();
  }
}

function createChoiceButton(text, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice-button";
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function choose(choice) {
  if (choice.score) {
    Object.entries(choice.score).forEach(([name, value]) => {
      state.scores[name] += value;
    });
  }

  state.sceneId = resolveNextScene(choice.next);
  renderScene();
}

function resolveNextScene(nextSceneId) {
  if (nextSceneId !== "festival_eve") {
    return nextSceneId;
  }

  if (state.scores.ren >= 5 && state.scores.ren > state.scores.aoi + 1) {
    return "ren_confession";
  }

  if (state.scores.aoi >= 5 && state.scores.aoi > state.scores.ren + 1) {
    return "aoi_confession";
  }

  return nextSceneId;
}

function setCharacterFocus(focus) {
  characterRen.classList.toggle("is-active", focus === "ren");
  characterAoi.classList.toggle("is-active", focus === "aoi");
}

function updateMeters() {
  renScore.textContent = state.scores.ren;
  aoiScore.textContent = state.scores.aoi;
  renMeter.style.width = `${Math.min(state.scores.ren * 14, 100)}%`;
  aoiMeter.style.width = `${Math.min(state.scores.aoi * 14, 100)}%`;
}

function addBacklog(scene) {
  const lastLog = state.backlog[state.backlog.length - 1];
  const currentLog = `${scene.speaker}：${scene.text}`;

  if (lastLog !== currentLog) {
    state.backlog.push(currentLog);
  }
}

function renderBacklog() {
  backlogList.innerHTML = "";

  if (state.backlog.length === 0) {
    const item = document.createElement("li");
    item.textContent = "まだ履歴はありません。";
    backlogList.append(item);
    return;
  }

  state.backlog.forEach((log) => {
    const item = document.createElement("li");
    item.textContent = log;
    backlogList.append(item);
  });
}

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  showToast("セーブしました");
}

function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);

  if (!saved) {
    showToast("セーブデータがありません");
    return;
  }

  const loaded = JSON.parse(saved);
  state.sceneId = loaded.sceneId || "start";
  state.scores.ren = loaded.scores?.ren || 0;
  state.scores.aoi = loaded.scores?.aoi || 0;
  state.backlog = loaded.backlog || [];
  startGame(false);
  showToast("ロードしました");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

startButton.addEventListener("click", () => startGame(true));
continueButton.addEventListener("click", loadGame);

document.querySelector("#saveButton").addEventListener("click", saveGame);
document.querySelector("#loadButton").addEventListener("click", loadGame);
document.querySelector("#resetButton").addEventListener("click", () => startGame(true));
document.querySelector("#backlogButton").addEventListener("click", () => {
  renderBacklog();
  backlogModal.showModal();
});
document.querySelector("#closeBacklogButton").addEventListener("click", () => backlogModal.close());
document.querySelector("#endingCloseButton").addEventListener("click", () => endingModal.close());
document.querySelector("#endingTitleButton").addEventListener("click", () => {
  endingModal.close();
  gameScreen.classList.remove("is-active");
  titleScreen.classList.add("is-active");
});
