import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iitem } from 'src/app/shared/components/select/select.component';
import { Ihits, INews } from './models/news.models';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnDestroy {
  currentUrl: string = "";
  currentPage = 0;
  viewPage = this.currentPage + 1
  items: any[] = [];
  itemsToDisplay: string[] = [];
  hits!: Ihits[]
  perPage = 10;
  totalPages: number = 1 //number of pages
  newsSub: Subscription = Subscription.EMPTY;
  query: string = 'angular' //TODO: cambiar angular 

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) {
    let urlParam = localStorage.getItem('params')
    if (urlParam) {
      let jsonUrlParam = JSON.parse(urlParam)
      this.currentPage = jsonUrlParam.page
      this.query = jsonUrlParam.query
    }
    this.getNews({ query: this.query, page: this.currentPage })


  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe()
  }
  public onGoTo(page: number): void {
    this.currentPage = page;
    this.handleQuery()
  }

  public onNext(page: number): void {
    this.currentPage = page + 1;
    this.handleQuery()
  }

  public onPrevious(page: number): void {
    this.currentPage = page - 1;
    this.handleQuery()
  }

  public paginate(currentPage: number, perPage: number): string[] {
    console.log(this.items)
    return [...this.items.slice((currentPage - 1) * perPage).slice(0, perPage)];
  }

  public onSelect(item: Iitem) {
    this.query = item.value
    this.handleQuery()
  }

  changeQuery(queryParams: { query: string, page: number }) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams });
  }

  getNews(params: any) {
    this.newsSub = this.newsService.getNews(params).subscribe(res => {
      this.hits = res.hits
      this.totalPages = res.nbPages
      this.perPage = res.hitsPerPage
      this.items = res.hits
      this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);
    })
  }

  handleQuery() {
    this.getNews({ query: this.query, page: this.currentPage })
    this.changeQuery({ query: this.query, page: this.currentPage })
    localStorage.setItem('params', JSON.stringify({ query: this.query, page: this.currentPage }));
  }

  onFavSelected(selectedButton: string) {
    if (selectedButton === 'all') {
      this.handleQuery()
    } else {
      let favorites = localStorage.getItem('favorites')
      this.items = []
      this.itemsToDisplay = []
      this.hits = []
      if (favorites) {
        this.hits = JSON.parse(favorites).map((el: Ihits) => { return { ...el, created_at: new Date(el.created_at) } })
        this.items = this.hits
      }
    }
  }
}
