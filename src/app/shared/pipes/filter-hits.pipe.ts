import { Pipe, PipeTransform } from '@angular/core';
import { Ihits } from 'src/app/modules/news/models/news.models';

@Pipe({
    name: 'filterHits'
})
export class FilterHitsPipe implements PipeTransform {
    transform(hits: Ihits[]) {
        console.log(hits.filter(hits => hits.author && hits.story_title && hits.story_url && hits.created_at))
        return hits.filter(hits => hits.author && hits.story_title && hits.story_url && hits.created_at)
    }
}