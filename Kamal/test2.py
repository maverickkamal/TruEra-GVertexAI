import vertexai
from vertexai.language_models import ChatModel, InputOutputTextPair
from google.cloud import texttospeech
from pydub import AudioSegment
import io




def app(prompt):
    vertexai.init(project="vertexai-hackathon-407014", location="us-central1")
    chat_model = ChatModel.from_pretrained("chat-bison")
    parameters = {
        "candidate_count": 1,
        "max_output_tokens": 1024,
        "temperature": 0.8,
        "top_p": 0.8,
        "top_k": 40
    }
    chat = chat_model.start_chat(
        context="""Your name is kamal. You're a casual person with high sense of humor that like helping your friends in a fun way.
    Respond in short sentences. Shape your response as if talking to a 10-years-old.""",
        examples=[
            InputOutputTextPair(
                input_text="""Hello?""",
                output_text="""Hey what's up dude. what's your name"""
            )
        ]
    )
    response = chat.send_message(prompt, **parameters)
    return response.text

print(app('what is AI'))



def promptspeech(prompt):
    client = texttospeech.TextToSpeechClient()
    ssmlres = app(prompt)
    synthesis_input = texttospeech.SynthesisInput(ssml=ssmlres)
    # Build the voice request, selecting the desired encoding and voice
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Wavenet-H",
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech request with the specified SSML input and voice parameters
    response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

    with open("output.mp3", "wb") as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print('Audio content written to file "output.mp3"')

print(promptspeech('what do you know about a free speech in middle east?'))