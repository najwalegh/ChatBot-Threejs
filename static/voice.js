const startbtn = document.querySelector("#voice-btn");
const chatBox= document.querySelector('.chatbox__support');
const recognition = new webkitSpeechRecognition();
recognition.continous =  true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;
 let messages = [];
startbtn.addEventListener("click",()=>{
    // console.log("test");
    recognition.start();

    // console.log("test2");
});

let utter = new SpeechSynthesisUtterance("hi, how are you?");

utter.onend =()=>{
  // if (s === 1) 
   recognition.stop();
 // recognition.start();
};
// var s=0;
// const transcript =e.results[e.results.length - 1][0].transcript.trim();
recognition.onresult =(e) =>{
    recognition.stop();
    alert("reco")
    const transcript =e.results[e.results.length - 1][0].transcript.trim();
    // if (transcript === "Bye") s=1;
    alert("reco")
    let msg1 = { name: "User", message: transcript }
        messages.push(msg1);
     if(transcript === "open google"){
            window.open("https://www.google.com")
        }

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: transcript }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          },
          recognition.stop())
          .then(r => r.json())
          .then(r => {
            recognition.stop();
            let msg2 = { name: "Sam", message: r.answer };
            utter.text = r.answer;
            synth.speak(utter);
            messages.push(msg2);
            updateChatText(chatBox)
            textField.value = ''

        }).catch((error) => {
            recognition.stop();
            console.error('Error:', error);
            utter.text = '';
            synth.speak(utter);
            updateChatText(chatBox)
            textField.value = ''
          });


   function updateChatText(chatBox) {
        var html = '';

        messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
               html += '<div class="messages_item messages_item--visitor">  ' + item.message+'</div>'
              // html+= '<img class="img-fluid tl-item-image" src='+item.msg1+' alt="img" width="60" height="50"/>'
             //   html += '<div class="messages_item messages_item--visitor">  ' + item.mvt+'</div>'

             //   window.f1(item.mvt);
           //    htmlBody+='<audio  controls src="{{ url_for(static, filename=voicejs/computer.mp3) }}"> <a>Download audio </a> </audio>'
                   //  htmlBody+='<audio  autoplay src="../static/voicejs/computer.mp3"> <a>Download audio </a> </audio>'
            // if (i===0){
            //        monItem=item.mvt;
            //        i++;
            //     }
            }
            else
            {

                html += '<div class="messages_item messages_item--operator">' + item.message + '</div>'
            }
          });
        const chatmessage = document.querySelector('.chatbox__messages');
       chatmessage.innerHTML = html;
    }
};