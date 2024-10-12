from langchain.prompts import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

#Used for prompt engineering for future use
prompt = ChatPromptTemplate.from_messages([
    ('system', """
        

        Question: {input}

        
    """),
    ('human', '{input}'),
])

#Used for going through the history, and reforming the user's question to include context. This is so we don't have to include the entire history every time
#could help save token; Not in use
contextualize_prompt = ChatPromptTemplate.from_messages([
    (
        'system', """

            Given a chat history and the latest user question \
                which might reference context in the chat history, formulate a standalone question with enough context \
                which can be understood without the chat history if the newest user question reference it. \
            You can also include any data in the previous conversation that is relevant as data to work with.
            Otherwise, return the original user question without modification. \
            NEVER answer the question, reformulate it with previous data if needed, otherwise return the \
                latest user question as is. \

            The user question contains case and content senstive words which are values in a database so \
                never remove any letter, symbol, or capitalize any word. \

            The conversation history format is: \
            human: my question \
            ai: ai response \

            Do not use uppercase in the reformulated question unless it was used in the original question \
            Return the formulated question only in the following format:

            Question: reformulated question here.
        """
    ),
    MessagesPlaceholder("chat_history"),
    ("human", "Your task is to only reformulate this question (only if relevant to the database) but do not answer: {input}"),
])
