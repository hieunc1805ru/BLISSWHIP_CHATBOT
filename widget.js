(function () {
    var API_URL = 'https://blisswhip-chatbot.vercel.app/api/chat';

   var style = document.createElement('style');
    style.textContent =
          '#bw-chat-bubble{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:999999;font-size:26px;}' +
          '#bw-chat-window{position:fixed;bottom:96px;right:24px;width:340px;max-width:calc(100vw - 32px);height:460px;max-height:calc(100vh - 140px);background:#fff;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.2);display:none;flex-direction:column;overflow:hidden;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}' +
          '#bw-chat-window.open{display:flex;}' +
          '#bw-chat-header{background:#111;color:#fff;padding:14px 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;font-size:14px;}' +
          '#bw-chat-close{cursor:pointer;opacity:.8;}' +
          '#bw-chat-messages{flex:1;overflow-y:auto;padding:12px;background:#f7f7f7;}' +
          '.bw-msg{margin-bottom:10px;max-width:85%;padding:8px 12px;border-radius:10px;font-size:14px;line-height:1.4;white-space:pre-wrap;}' +
          '.bw-msg.user{background:#111;color:#fff;margin-left:auto;}' +
          '.bw-msg.bot{background:#e9e9eb;color:#111;margin-right:auto;}' +
          '#bw-chat-inputrow{display:flex;border-top:1px solid #eee;padding:8px;gap:8px;}' +
          '#bw-chat-input{flex:1;border:1px solid #ddd;border-radius:8px;padding:8px 10px;font-size:14px;resize:none;font-family:inherit;}' +
          '#bw-chat-send{background:#111;color:#fff;border:none;border-radius:8px;padding:0 14px;cursor:pointer;font-size:14px;}' +
          '#bw-chat-send:disabled{opacity:.5;cursor:default;}';
    document.head.appendChild(style);

   var bubble = document.createElement('div');
    bubble.id = 'bw-chat-bubble';
    bubble.innerHTML = '&#128172;';
    document.body.appendChild(bubble);

   var win = document.createElement('div');
    win.id = 'bw-chat-window';
    win.innerHTML =
          '<div id="bw-chat-header"><span>BlissWhip Support</span><span id="bw-chat-close">&#10005;</span></div>' +
          '<div id="bw-chat-messages"></div>' +
          '<div id="bw-chat-inputrow">' +
          '<textarea id="bw-chat-input" rows="1" placeholder="Ask us anything..."></textarea>' +
          '<button id="bw-chat-send">Send</button>' +
          '</div>';
    document.body.appendChild(win);

   var messagesEl = win.querySelector('#bw-chat-messages');
    var inputEl = win.querySelector('#bw-chat-input');
    var sendBtn = win.querySelector('#bw-chat-send');
    var history = [];

   function addMessage(role, text) {
         var div = document.createElement('div');
         div.className = 'bw-msg ' + (role === 'user' ? 'user' : 'bot');
         div.textContent = text;
         messagesEl.appendChild(div);
         messagesEl.scrollTop = messagesEl.scrollHeight;
   }

   function greet() {
         if (messagesEl.children.length === 0) {
                 addMessage(
                           'assistant',
                           "Hi! I'm BlissWhip's support assistant. Ask me anything about our N2O whipped cream chargers, certifications, policies, or how to order."
                         );
         }
   }

   bubble.addEventListener('click', function () {
         win.classList.toggle('open');
         if (win.classList.contains('open')) {
                 greet();
                 inputEl.focus();
         }
   });
    win.querySelector('#bw-chat-close').addEventListener('click', function () {
          win.classList.remove('open');
    });

   function send() {
         var text = inputEl.value.trim();
         if (!text) return;
         addMessage('user', text);
         history.push({ role: 'user', content: text });
         inputEl.value = '';
         sendBtn.disabled = true;

      var typingEl = document.createElement('div');
         typingEl.className = 'bw-msg bot';
         typingEl.textContent = '...';
         messagesEl.appendChild(typingEl);
         messagesEl.scrollTop = messagesEl.scrollHeight;

      fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messages: history }),
      })
           .then(function (res) {
                     return res.json();
           })
           .then(function (data) {
                     typingEl.remove();
                     var reply = data.reply || 'Sorry, something went wrong. Please email JeongGas@phucthanhgroup.com.';
                     addMessage('assistant', reply);
                     history.push({ role: 'assistant', content: reply });
           })
           .catch(function () {
                     typingEl.remove();
                     addMessage('assistant', "Sorry, I'm having trouble connecting. Please email JeongGas@phucthanhgroup.com.");
           })
           .finally(function () {
                     sendBtn.disabled = false;
           });
   }

   sendBtn.addEventListener('click', send);
    inputEl.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
          }
    });
})();
