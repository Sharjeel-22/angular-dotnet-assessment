import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListNewestStoriesComponent } from './list-newest-stories.component';
import { NewestStoryService } from '../service/newest-story.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ListNewestStoriesComponent', () => {
  let component: ListNewestStoriesComponent;
  let fixture: ComponentFixture<ListNewestStoriesComponent>;
  let mockStoryService: jasmine.SpyObj<NewestStoryService>;

  beforeEach(async () => {
    mockStoryService = jasmine.createSpyObj('NewestStoryService', ['getStories']);
    await TestBed.configureTestingModule({
      declarations: [ListNewestStoriesComponent],
      providers: [{ provide: NewestStoryService, useValue: mockStoryService }],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewestStoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on ngOnInit', () => {
    const mockStories = [
      { id: 1, title: 'Story 1', url: 'https://example.com/story1' },
      { id: 2, title: 'Story 2', url: 'https://example.com/story2' },
    ];
    mockStoryService.getStories.and.returnValue(of(mockStories));

    component.ngOnInit();

    expect(component.stories).toEqual(mockStories);
    expect(component.allStories).toEqual(mockStories);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to previous page', () => {
    component.currentPage = 2;
    component.allStories = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Story ${i + 1}`, url: `https://example.com/story${i + 1}` }));
    component.itemsPerPage = 10;

    component.prevPage();

    expect(component.currentPage).toBe(1);
  });

  it('should navigate to next page', () => {
    component.currentPage = 1;
    component.allStories = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Story ${i + 1}`, url: `https://example.com/story${i + 1}` }));
    component.itemsPerPage = 10;

    component.nextPage();

    expect(component.currentPage).toBe(2);
  });

  it('should update paged data', () => {
    component.currentPage = 2;
    component.allStories = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Story ${i + 1}`, url: `https://example.com/story${i + 1}` }));
    component.itemsPerPage = 10;

    component.updatePagedData();

    expect(component.stories.length).toBe(10);
    expect(component.stories[0].id).toBe(11);
    expect(component.stories[9].id).toBe(20);
  });

  it('should calculate total pages', () => {
    component.allStories = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Story ${i + 1}`, url: `https://example.com/story${i + 1}` }));
    component.itemsPerPage = 10;

    expect(component.totalPages).toBe(2);
  });
});
