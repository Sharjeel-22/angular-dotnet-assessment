import { Component,OnInit } from '@angular/core';
import { NewsItem } from '../model/NewsItem';
import { NewestStoryService } from '../service/newest-story.service';


@Component({
  selector: 'list-newest-stories',
  templateUrl: './list-newest-stories.component.html',
  styleUrls: ['./list-newest-stories.component.scss']
})
export class ListNewestStoriesComponent implements OnInit{
  searchedText = "";
  itemsPerPage = 10;
  currentPage = 1;
  stories: NewsItem[] =[];
  allStories: NewsItem[] = [];
  isLoading: boolean = false;

  constructor(private storyService:NewestStoryService){
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.storyService.getStories().subscribe((res:NewsItem[]) => {
      this.stories = res;
      this.allStories = [...this.stories];
      this.stories = this.stories.slice(0,this.itemsPerPage);
      this.isLoading = false;
    })
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.stories = this.allStories.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.allStories.length / this.itemsPerPage);
  }

}
