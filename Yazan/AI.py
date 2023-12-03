import pyttsx3 #converts text to speech
import datetime
import speech_recognition as sr # Converts speech data from mic to text
import smtplib # Library used to send emails
from secret import senderemail, epwd, to
from email.message import EmailMessage
import pyautogui
import webbrowser as wb
from time import sleep #Stop program for specific time
import wikipedia
import pywhatkit
import requests
# import clipboard
#clipboard still not installing
import os
# import pyjokes
#pyjokes are lame and I want to add my own dark humour jokes
import time as tt
import random
# Import nltk for wakeword



engine = pyttsx3.init() #This is windows 11 so we have to use sapi5 for now as a pre-built AI 


def speak(text):
    engine.say(text)
    engine.runAndWait()
    
def time():
    Time = datetime.datetime.now().strftime("%I:%M")
    speak('the current time is:')
    speak(Time)  

def date(): #Can check datetime documentation for more info and unique outptut
    #year = int(datetime.datetime.now().year)
    month = int(datetime.datetime.now().month)
    date = int(datetime.datetime.now().day)
    speak("the current date is: ")
    speak(date)
    speak(month)
    #speak(year)
    
def greeting():
    hour = datetime.datetime.now().hour
    if hour >= 6 and hour <12:
        speak('Good morning sir')
    elif hour >= 12 and hour <= 18:
        speak('Good afternoon sir')
    elif hour >= 18 and hour <= 24:
        speak('Good evening sir')
    else:
        speak("Good night")
        
def wishme():
    speak("Welcome Back Sir")
    time()
    date()
    greeting()
    speak("rafia at your service, how can i help you")

def takeCommandCMD():
    query = input('please how can i help you?\n')
    return query

def takeCommandMIC():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print('Listening...')
        r.pause_threshold = 1 # 1 second pause to get input from user
        audio = r.listen(source) #Storing what input was given inside audio variable
        
    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language = 'en-EN')
        print("User said: " + query)
        
    except Exception as e:
        print(e)
        speak("Say that again please...")
        return "none"
    return query

# Need to fix if I said excluded baby and I said hey baby search baby by justin bieber
# Make it also read any email I receive
def sendEmail(receiver, subject, content):
    server = smtplib.SMTP('smtp.live.com', 587, timeout=60) #port number of gmail
    server.starttls() #TLS = transport layer security to make it secure to send email
    server.login(senderemail, epwd)
    email = EmailMessage() # We keep adding brackets cuz its a built in function
    email['From'] = senderemail
    email['To'] = receiver
    email['Subject'] = subject
    email.set_content(content)
    server.send_message(email)
    server.close()  

def sendwhatsmsg(phone_no, message): #Using sleep to wait for program to open whatsapp and send to the number
    Message = message
    wb.open('https:web.whatsapp.com/send?phone='+phone_no+'&text='+Message)
    sleep(10) #10 seconds
    pyautogui.press('enter') #presses enter key for us


def searchgoogle(): #opens tab in google and seaches
    speak('what should i search for?')
    search = takeCommandMIC()
    wb.open('https://www.google.com/search?q='+search)

# def text2speech():
#     text = clipboard.paste()
#     print(text)
#     speak(text)
    
def screenshot():
    name_img = tt.time()
    name_img = f'C:\\Users\\yazan\\Desktop\\RAAFYA\\screenshot\\{name_img}.png'
    img = pyautogui.screenshot(name_img)
    img.show()

def flip():
    speak("oh boy you can get screwed for that")
    coin = ['heads', 'tails']
    toss = []
    toss.extend(coin)
    random.shuffle(toss)
    toss =(''.join(toss[0]))
    speak("it's" + toss)

if __name__ == "__main__": # did not add news function
    #wishme()
    while True:
        query = takeCommandMIC().lower()
        if 'time' in query:
            time()
            
        elif 'date' in query:
            date()
        
        elif 'email' in query:
            email_list = { #can add more emails
                'test email':'badeekimeh@hotmail.com'
                
                
            }
            try: 
                speak('to whom you want to send the email')
                name = takeCommandMIC()
                receiver = email_list[name]
                speak("what is the subject of the email")
                subject = takeCommandMIC()
                speak('what should i say')
                content = takeCommandMIC()
                sendEmail(receiver, subject, content)
                speak('email has been sent')
            except Exception as e:
                print(e)
                speak("unable to send email")
                
        elif 'wikipedia' in query:
            speak('searching on wikipedia...')
            query = query.replace('wikipedia', "")
            result = wikipedia.summary(query) # number of sentences that it will give
            print(result)
            speak(result)
                
        elif 'message' in query:
            user_name = {
                'yazan' : '+971509108917'
                
                
            }
            
            try: 
                speak('to whom you want to send the whats app msg?')
                name = takeCommandMIC()
                phone_no = user_name[name]
                speak("what is the message")
                message = takeCommandMIC()
                sendwhatsmsg(phone_no, message)
                speak('message has been sent')
            except Exception as e:
                print(e)
                speak("unable to send message")
         
        elif 'search' in query:
            searchgoogle()
            
        elif 'youtube' in query: #Still want to add shortcuts for mute, volume etc
            speak('what should I search for on youtube?')
            topic = takeCommandMIC() #Topic is just a variable to take user input
            pywhatkit.playonyt(topic)
            
        elif 'weather' in query: # Code to make it check temp of any city (Mentioned in video)
            url = 'http://api.openweathermap.org/data/2.5/weather?q=Abu%20Dhabi&units=imperial&appid=dd156e126a7946561e3f867a143c94d2'
            
            res = requests.get(url) # It returns in JSON so we have to access it in JSON
            data = res.json()
            
            weather = data['weather'][0]['main']
            temp = data['main']['temp']
            desc = data['weather'][0]['description']
            temp = round((temp - 32) * 5/9)
            print(weather)
            print(temp)
            print(desc)
            speak('The temperature is: {} degrees celsius'.format(temp))
            speak(' and the weather is {}'.format(desc))      
        
        
        elif 'read' in query:
            text2speech()
            
        elif 'open' in query: #Can open documents but then want to make it open specific
            os.system('explorer C://{}'.format(query.replace('Open', '')))    
            
        elif 'open code' in query: # Be able to open any app without coding it manually
            codepath = 'C:\\Users\\yazan\\AppData\\Local\\Programs\\Microsoft VS Code\\code.exe'
            os.startfile(codepath)
        
        elif 'screenshot' in query:
            screenshot()
        
        elif 'remember' in query: #remove words like "remind me" and add day + time and let it remind me 1hr earlier
            #It also needs to create a list of what should be remembered
            speak('what would you like me to remember')
            data = takeCommandMIC()
            speak('you told me to remember that' + data)
            remember = open('data.txt', 'w') #w is write cuz we want it to write what we asked it to remember
            remember.write(data)
            remember.close()
            
        elif 'do you know anything' in query:
            remember = open('data.txt', 'r') #r is read cuz we want it to read
            speak('you told me to remember that '+ remember.read())
        
        elif 'flip' in query:
            flip()
        
        elif 'offline' in query:
            quit()
            
            
