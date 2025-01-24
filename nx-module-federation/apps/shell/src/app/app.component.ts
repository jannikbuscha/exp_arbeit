import {Component, OnInit, ViewChild, Injector, ViewContainerRef} from '@angular/core';
import {RouterModule} from '@angular/router';
import {loadRemote} from '@module-federation/enhanced/runtime';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  @ViewChild('dynamicMFE1ComponentContainer', { read: ViewContainerRef, static: true })
  mfe1Container!: ViewContainerRef;

  @ViewChild('dynamicMFE2ComponentContainer', { read: ViewContainerRef, static: true })
  mfe2Container!: ViewContainerRef;

  // constructor(private injector: Injector) {}

  async ngOnInit() {
    // Load dynamic remote component
    const mfe1Component = await loadRemote<typeof import('mfe1/Component')>('mfe1/Component');
    const mfe2Component = await loadRemote<typeof import('mfe2/Component')>('mfe2/Component');

    if (!mfe1Component || !mfe2Component) {
      throw new Error('Cannot load remote component');
    }

    const mfe1Ref = this.mfe1Container.createComponent(mfe1Component.default
      // , {injector: this.injector,}
    );

    const mfe2Ref = this.mfe2Container.createComponent(mfe2Component.default
      // , {injector: this.injector,}
    );

    // Change detection
    mfe1Ref.changeDetectorRef.detectChanges();
    mfe2Ref.changeDetectorRef.detectChanges();
  }
}
