import { TestBed } from '@angular/core/testing';

import { NewestStoryService } from './newest-story.service';

xdescribe('NewestStoryService', () => {
  let service: NewestStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewestStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
