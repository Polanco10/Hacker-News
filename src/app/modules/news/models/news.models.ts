export interface INews {
    hits: Ihits[],
    nbHits: number,
    page: number,
    nbPages: number,
    hitsPerPage: number,
    exhaustiveNbHits: boolean,
    exhaustiveTypo: boolean,
    query: string,
    params: string,
    processingTimeMS: number
}


export interface Ihits {
    author: string
    comment_text: string
    created_at: Date
    created_at_i: number
    num_comments: number
    objectID: string
    parent_id: number
    points: number
    story_id: number
    story_text: string
    story_title: string
    story_url: string
    title: string
    url: string
    _highlightResult: IHighlightResult,
    _tags: string[]
}

interface IHighlightResult {

    author: {
        value: string,
        matchLevel: string,
        matchedWords: []
    },
    comment_text: {
        value: string,
        matchLevel: string,
        fullyHighlighted: boolean,
        matchedWords: string[]
    },
    story_title: {
        value: string,
        matchLevel: string,
        matchedWords: string[]
    },
    story_url: {
        value: string,
        matchLevel: string,
        matchedWords: string[]
    }

}

