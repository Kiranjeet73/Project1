import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appPlaceholder]'    //attribute selector so that we can use it as attribute in element
})
export class PlaceholderDirective{
constructor(public viewContainerRef: ViewContainerRef){

}
}