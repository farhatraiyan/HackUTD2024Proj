from langchain.prompts import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = ChatPromptTemplate.from_messages([
    ('system', """
        

        Question: {input}

        
    """),
    ('human', '{input}'),
])


contextualize_prompt = ChatPromptTemplate.from_messages([
    (
        'system', """

            Given a chat history and the latest user question \
                which might reference context in the chat history, formulate a standalone question with enough context \
                which can be understood without the chat history if the newest user question reference it. \
            You can also include any data in the previous conversation that is relevant as data to work with \
                to avoid the need to fetch data again.
            Otherwise, return the original user question without modification. \
            NEVER answer the question, reformulate it with previous data if needed, otherwise return the \
                latest user question as is. \
            If the user question is irrelevant to the provided database, respond with \
                'The user asked an invalid question. Terminate execution' \

            The user question contains case and content senstive words which are values in a database so \
                never remove any letter, symbol, or capitalize any word. \
            Sometimes the user make mistake in the case and content senstive words, so if they correct it, \
                then ignore the previous case and content senstive words \
                that is similar to the corrected ones. \
                
            If the question mentions the word experience, always add the list of games/channels to the new question,
                    An example of a list of games would be:
                        x is game 1, y is game 2, etc.
                The name of the game always refers to a channel in the database
            If the question is talking about anything in an experience, 
                that means the question is asking about games specifally in that experience and not all the games in the database.

            If user ask to visualize distribution of data, append "distribution_chart_definition" \
                to the end of the reformulated question.\
            If user ask to visualize historical data, append "historical_graph_definition" \
                to the end of the reformulated question.\
            Append visualization described above and context if user follow up on creating visualization.\

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
