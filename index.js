// index.js

const personaButtons = document.querySelectorAll(".persona-btn");
const customBox = document.getElementById("custom-box");
const customInput = document.getElementById("custom-input");

const startBtn = document.getElementById("start-btn");

const selectPage = document.getElementById("select-page");
const chatPage = document.getElementById("chat-page");

const chatContainer = document.getElementById("chat-container");

let selectedPersonas = [];

const personaMessages = {
  "논리적 분석가":
    "토론을 시작하기 전에, 각자 이 책에서 가장 인상 깊었던 장면이나 문장을 하나씩 꼽아보면 어떨까요? 거기서 출발하면 핵심 주제를 체계적으로 정리하기가 훨씬 수월할 것 같습니다.",

  "지배적 정복자":
    "자, 시작합시다. 이 책을 읽고 나서 가장 강하게 남은 인상이 뭔가요? 두루뭉술한 감상 말고, 딱 한 마디로 말해보세요.",

  "외교적 중재자":
    "오늘 토론이 즐거운 자리가 됐으면 좋겠어요. 먼저 각자 이 책을 읽으면서 어떤 감정이 들었는지 편하게 이야기해볼까요? 정답은 없으니까요.",

  "비판적 회의론자":
    "다들 이 책 어떻게 읽으셨나요? 저는 읽으면서 고개를 갸웃하게 되는 부분이 몇 군데 있었는데, 여러분은 별다른 의문 없이 읽히던가요?",
};

personaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const persona = button.dataset.persona;

    // 이미 선택된 경우 해제
    if (selectedPersonas.includes(persona)) {
      selectedPersonas = selectedPersonas.filter(
        (item) => item !== persona
      );

      button.classList.remove("selected");

      if (persona === "커스텀") {
        customBox.classList.add("hidden");
      }

      return;
    }

    // 최대 2개 제한
    if (selectedPersonas.length >= 2) {
      alert("최대 2개까지 선택 가능합니다.");
      return;
    }

    selectedPersonas.push(persona);
    button.classList.add("selected");

    if (persona === "커스텀") {
      customBox.classList.remove("hidden");
    }
  });
});

startBtn.addEventListener("click", () => {
  if (selectedPersonas.length === 0) {
    alert("페르소나를 선택해주세요.");
    return;
  }

  selectPage.classList.add("hidden");
  chatPage.classList.remove("hidden");

  startChat();
});

function addMessage(name, text) {
  const messageEl = document.createElement("div");
  messageEl.className = "message";

  messageEl.innerHTML = `
    <div class="name">${name}</div>
    <div class="bubble">${text}</div>
  `;

  chatContainer.appendChild(messageEl);

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function startChat() {
  selectedPersonas.forEach((persona, index) => {
    setTimeout(() => {
      // 커스텀 페르소나
      if (persona === "커스텀") {
        const customPersona =
          customInput.value.trim() || "커스텀 페르소나";

        addMessage(
          customPersona,
          "안녕하세요. 이후 AI 연결 예정인 커스텀 페르소나입니다."
        );

        return;
      }

      // 기본 페르소나
      addMessage(
        persona,
        personaMessages[persona]
      );
    }, 1000 * (index + 1));
  });
}