import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: "[highlighting]"
})
export class HighlightDirective {
    constructor(private element: ElementRef, private renderer: Renderer2){
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }

    @HostListener("mouseenter") onMouseEnter(): void {
        this.setHighliht("#5594adc0", "white");
    }
    @HostListener("mouseleave") onMouseLeave(): void {
        this.setHighliht("white", "black");
    }

    private setHighliht (backValue: string, textColor: string): void {
       this.renderer.setStyle(this.element.nativeElement, "background", backValue );
       this.renderer.setStyle(this.element.nativeElement, "color", textColor);
    }
}
