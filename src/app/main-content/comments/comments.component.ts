import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Represents the comments section of the website.
 * Displays a horizontally scrollable slider with user comments.
 * Supports both button-controlled navigation and drag gestures.
 */
@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements AfterViewInit {

  @ViewChild('slider') sliderRef!: ElementRef<HTMLElement>;

  /**
  * Array of comment cards containing text and author keys for translation.
  */
  cards = [
    { textKey: 'comments.card1.text', authorKey: 'comments.card1.author' },
    { textKey: 'comments.card2.text', authorKey: 'comments.card2.author' },
    { textKey: 'comments.card3.text', authorKey: 'comments.card3.author' },
    { textKey: 'comments.card4.text', authorKey: 'comments.card4.author' },
    { textKey: 'comments.card5.text', authorKey: 'comments.card5.author' },
    { textKey: 'comments.card6.text', authorKey: 'comments.card6.author' }
  ];

  /**
   * Index of the currently active comment card.
   */
  activeIndex = 1;
  startX = 0;
  currentX = 0;
  isDragging = false;

  /**
   * Lifecycle hook that runs after the view initializes.
   * Ensures the slider is properly set up.
   */
  ngAfterViewInit() {
    this.updateSlider();
  }

  /**
   * Updates the slider's transition properties.
   */
  updateSlider() {
    const slider = this.sliderRef.nativeElement;
    if (slider) {
      slider.style.transition = 'transform 0.5s ease-in-out';
    }
  }

  /**
   * Moves the slider to the next comment card.
   */
  nextFunc() {
    const slider = this.sliderRef.nativeElement;
    if (!slider) return;

    this.setActiveCard(slider.children as HTMLCollectionOf<HTMLElement>, 1, 2);
    this.slideLeft(slider);

    setTimeout(() => {
      this.reorderNext(slider);
      this.fixActiveState(slider);
    }, 500);
    this.updateActiveIndex('next');
  }

  /**
   * Moves the slider to the previous comment card.
   */
  prevFunc() {
    const slider = this.sliderRef.nativeElement;
    if (!slider) return;
    const slideDistance = this.moveLastItemToFirst(slider);
    this.restoreTransitionAndFixState(slider, slideDistance);
  }

  /**
   * Moves the last item in the slider to the first position.
   * @param slider The slider element.
   * @returns The slide distance.
   */
  private moveLastItemToFirst(slider: HTMLElement) {
    const lastItem = slider.lastElementChild as HTMLElement;
    const itemWidth = lastItem.offsetWidth;
    const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
    const slideDistance = itemWidth + gap;
    slider.style.transition = 'none';
    slider.insertBefore(lastItem, slider.firstElementChild);
    slider.style.transform = `translateX(-${slideDistance}px)`;
    return slideDistance;
  }

  /**
   * Restores the transition effect and adjusts the active card state.
   * @param slider The slider element.
   * @param slideDistance The slide distance.
   */
  private restoreTransitionAndFixState(slider: HTMLElement, slideDistance: number) {
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease-in-out';
      slider.style.transform = 'translateX(0)';
      this.fixActiveState(slider);
    }, 50);
    this.updateActiveIndex('prev');
  }

  /**
     * Updates the active index based on the navigation direction.
     * @param direction 'next' for forward, 'prev' for backward.
     */
  updateActiveIndex(direction: 'next' | 'prev') {
    if (direction === 'next') {
      this.activeIndex = (this.activeIndex + 1) % this.cards.length;
    } else {
      this.activeIndex = (this.activeIndex - 1 + this.cards.length) % this.cards.length;
    }
  }

  /**
   * Sets the active card by updating CSS classes.
   * @param items List of slider elements.
   * @param oldIndex Index of the previous active card.
   * @param newIndex Index of the new active card.
   */
  private setActiveCard(items: HTMLCollectionOf<HTMLElement>, oldIndex: number, newIndex: number) {
    items[oldIndex]?.classList.remove('active');
    items[newIndex]?.classList.add('active');
  }

  /**
   * Slides the slider leftward.
   * @param slider The slider element.
   */
  private slideLeft(slider: HTMLElement) {
    const firstItem = slider.firstElementChild as HTMLElement;
    const itemWidth = firstItem.offsetWidth;
    const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
    const slideDistance = itemWidth + gap;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${slideDistance}px)`;
  }

  /**
   * Moves the first item to the end of the slider after sliding left.
   * @param slider The slider element.
   */
  private reorderNext(slider: HTMLElement) {
    slider.style.transition = 'none';
    const firstItem = slider.firstElementChild as HTMLElement;
    slider.appendChild(firstItem);
    slider.style.transform = 'translateX(0)';
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  }

  /**
   * Fixes the active state of the slider cards.
   * @param slider The slider element.
   */
  private fixActiveState(slider: HTMLElement) {
    const items = slider.children as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
    }
    if (items.length > 1) {
      items[1].classList.add('active');
    }
  }

  /** === DRAGGING-FUNCTIONS === */

  /**
   * Handles the drag start event.
   * @param event The mouse or touch event.
   */
  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.currentX = this.startX;
    document.querySelector('.card-slider-main')?.classList.add('dragging');
  }

  /**
 * Handles the drag move event (tracking only).
 * @param event The mouse or touch event.
 */
  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    this.currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    if (event instanceof TouchEvent) event.preventDefault();
  }

  /**
 * Handles the drag end event.
 * Calls prevFunc() or nextFunc() based on swipe direction.
 */
  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    document.querySelector('.card-slider-main')?.classList.remove('dragging');
    const deltaX = this.currentX - this.startX;
    const threshold = 50;
    if (Math.abs(deltaX) >= threshold) {
      if (deltaX > 0) {
        this.prevFunc();
      } else {
        this.nextFunc();
      }
    }
  }

  /**
   * Resets the slider position if no valid drag action is detected.
   */
  resetSlider() {
    const slider = this.sliderRef.nativeElement;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = 'translateX(0)';
  }
}