class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;
        
        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }else if(text1==="bb"){
            return
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);
        if(text1 === "open google"){
            window.open("https://www.google.com")
        }

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer,emotes:r.emote };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
            // if(r.answer ==="We sell coffee and tea"){
            //     alert("yees");
            // }
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    //       let greeting=["hi","hey","how are you","is anyone there?","hello","good day","yo","hola","hi there"];
    //       let goodbye=["bye", "see you later", "goodbye"];
    //       let thanks=["thanks", "thank you", "that's helpful", "thank's a lot!","thanks for helping me"];
    //       if (greeting.includes(text1) || goodbye.includes(text1)) {
    //         window.f1("Wave");
    //         return;
    //     }else if(thanks.includes(text1)){
    // const emotes = [ 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' ];
    //         window.f1("ThumbsUp");
    //     }
    }

    updateChatText(chatbox) {
        var html = '';
        var i=0;
        var monItem = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
                if (i==0){
                    monItem=item.emotes;
                    i++;
                }
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });
          if(monItem!="null"){
          window.f1(monItem);
        }
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();




