import { Directive, ElementRef, Input, OnChanges, Renderer2 } from "@angular/core";

@Directive({
    selector: "[sort-img]",
})
export class SortImgDirective implements OnChanges{
    @Input() sortImg: string = "";
    constructor(private element: ElementRef, private renderer: Renderer2){
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }

    ngOnChanges(): void {
        if (this.sortImg === "down") {
            this.setSortImg("assets/sortdown.png");
        } else if (this.sortImg === "up") {
            this.setSortImg("assets/sortup.png");
        }
    }

    private setSortImg(value: string): void {
        this.renderer.setAttribute(this.element.nativeElement, "src", value);
    }
}
