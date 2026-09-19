function Lesson({page}){
    return (
        <div 
                dangerouslySetInnerHTML={{__html: page.content}}
            />
    )
}

export default Lesson;