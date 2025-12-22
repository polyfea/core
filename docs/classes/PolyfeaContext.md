[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / PolyfeaContext

# Class: PolyfeaContext

Defined in: [src/polyfea-context.ts:31](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L31)

## Name

polyfea-context

## Description

This component uses the Polyfea interface to load a context area, dynamically render its elements,
and load the resources for the associated microfrontend before rendering the elements.
If the context area cannot be retrieved or it has no elements, the slotted content is displayed instead.

## Remarks

For more details on the ContextArea type, refer to the @polyfea/browser-api package documentation.
The path for context area requests is relative to document.baseURI.

## Slot

- The slotted content is displayed if the context area  has no elements.

## Slot

error - This slot is present if an error occurs during context area retrieval or loading of dependencies, together with setting error attribute
  on the polyfea-context element

## Extends

- `HTMLElement`

## Properties

### accessKey

> **accessKey**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13688

The **`HTMLElement.accessKey`** property sets the keystroke which a user can press to jump to a given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/accessKey)

#### Inherited from

`HTMLElement.accessKey`

***

### accessKeyLabel

> `readonly` **accessKeyLabel**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13694

The **`HTMLElement.accessKeyLabel`** read-only property returns a string containing the element's browser-assigned access key (if any); otherwise it returns an empty string.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/accessKeyLabel)

#### Inherited from

`HTMLElement.accessKeyLabel`

***

### ariaActiveDescendantElement

> **ariaActiveDescendantElement**: `Element` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2607

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaActiveDescendantElement)

#### Inherited from

`HTMLElement.ariaActiveDescendantElement`

***

### ariaAtomic

> **ariaAtomic**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2609

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaAtomic)

#### Inherited from

`HTMLElement.ariaAtomic`

***

### ariaAutoComplete

> **ariaAutoComplete**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2611

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaAutoComplete)

#### Inherited from

`HTMLElement.ariaAutoComplete`

***

### ariaBrailleLabel

> **ariaBrailleLabel**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2613

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleLabel)

#### Inherited from

`HTMLElement.ariaBrailleLabel`

***

### ariaBrailleRoleDescription

> **ariaBrailleRoleDescription**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2615

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleRoleDescription)

#### Inherited from

`HTMLElement.ariaBrailleRoleDescription`

***

### ariaBusy

> **ariaBusy**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2617

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBusy)

#### Inherited from

`HTMLElement.ariaBusy`

***

### ariaColCount

> **ariaColCount**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2621

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColCount)

#### Inherited from

`HTMLElement.ariaColCount`

***

### ariaColIndex

> **ariaColIndex**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2623

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColIndex)

#### Inherited from

`HTMLElement.ariaColIndex`

***

### ariaColIndexText

> **ariaColIndexText**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2625

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColIndexText)

#### Inherited from

`HTMLElement.ariaColIndexText`

***

### ariaColSpan

> **ariaColSpan**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2627

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColSpan)

#### Inherited from

`HTMLElement.ariaColSpan`

***

### ariaControlsElements

> **ariaControlsElements**: readonly `Element`[] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2629

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaControlsElements)

#### Inherited from

`HTMLElement.ariaControlsElements`

***

### ariaCurrent

> **ariaCurrent**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2631

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaCurrent)

#### Inherited from

`HTMLElement.ariaCurrent`

***

### ariaDescribedByElements

> **ariaDescribedByElements**: readonly `Element`[] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2633

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDescribedByElements)

#### Inherited from

`HTMLElement.ariaDescribedByElements`

***

### ariaDescription

> **ariaDescription**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2635

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDescription)

#### Inherited from

`HTMLElement.ariaDescription`

***

### ariaDetailsElements

> **ariaDetailsElements**: readonly `Element`[] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2637

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDetailsElements)

#### Inherited from

`HTMLElement.ariaDetailsElements`

***

### ariaDisabled

> **ariaDisabled**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2639

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDisabled)

#### Inherited from

`HTMLElement.ariaDisabled`

***

### ariaErrorMessageElements

> **ariaErrorMessageElements**: readonly `Element`[] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2641

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaErrorMessageElements)

#### Inherited from

`HTMLElement.ariaErrorMessageElements`

***

### ariaExpanded

> **ariaExpanded**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2643

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaExpanded)

#### Inherited from

`HTMLElement.ariaExpanded`

***

### ariaFlowToElements

> **ariaFlowToElements**: readonly `Element`[] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2645

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaFlowToElements)

#### Inherited from

`HTMLElement.ariaFlowToElements`

***

### ariaHasPopup

> **ariaHasPopup**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2647

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaHasPopup)

#### Inherited from

`HTMLElement.ariaHasPopup`

***

### ariaHidden

> **ariaHidden**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2649

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaHidden)

#### Inherited from

`HTMLElement.ariaHidden`

***

### ariaChecked

> **ariaChecked**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2619

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaChecked)

#### Inherited from

`HTMLElement.ariaChecked`

***

### ariaInvalid

> **ariaInvalid**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2651

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaInvalid)

#### Inherited from

`HTMLElement.ariaInvalid`

***

### ariaKeyShortcuts

> **ariaKeyShortcuts**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2653

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaKeyShortcuts)

#### Inherited from

`HTMLElement.ariaKeyShortcuts`

***

### ariaLabel

> **ariaLabel**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2655

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLabel)

#### Inherited from

`HTMLElement.ariaLabel`

***

### ariaLabelledByElements

> **ariaLabelledByElements**: readonly `Element`[] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2657

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLabelledByElements)

#### Inherited from

`HTMLElement.ariaLabelledByElements`

***

### ariaLevel

> **ariaLevel**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2659

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLevel)

#### Inherited from

`HTMLElement.ariaLevel`

***

### ariaLive

> **ariaLive**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2661

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLive)

#### Inherited from

`HTMLElement.ariaLive`

***

### ariaModal

> **ariaModal**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2663

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaModal)

#### Inherited from

`HTMLElement.ariaModal`

***

### ariaMultiLine

> **ariaMultiLine**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2665

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaMultiLine)

#### Inherited from

`HTMLElement.ariaMultiLine`

***

### ariaMultiSelectable

> **ariaMultiSelectable**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2667

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaMultiSelectable)

#### Inherited from

`HTMLElement.ariaMultiSelectable`

***

### ariaOrientation

> **ariaOrientation**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2669

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaOrientation)

#### Inherited from

`HTMLElement.ariaOrientation`

***

### ariaOwnsElements

> **ariaOwnsElements**: readonly `Element`[] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2671

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaOwnsElements)

#### Inherited from

`HTMLElement.ariaOwnsElements`

***

### ariaPlaceholder

> **ariaPlaceholder**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2673

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPlaceholder)

#### Inherited from

`HTMLElement.ariaPlaceholder`

***

### ariaPosInSet

> **ariaPosInSet**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2675

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPosInSet)

#### Inherited from

`HTMLElement.ariaPosInSet`

***

### ariaPressed

> **ariaPressed**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2677

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPressed)

#### Inherited from

`HTMLElement.ariaPressed`

***

### ariaReadOnly

> **ariaReadOnly**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2679

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaReadOnly)

#### Inherited from

`HTMLElement.ariaReadOnly`

***

### ariaRelevant

> **ariaRelevant**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2681

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRelevant)

#### Inherited from

`HTMLElement.ariaRelevant`

***

### ariaRequired

> **ariaRequired**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2683

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRequired)

#### Inherited from

`HTMLElement.ariaRequired`

***

### ariaRoleDescription

> **ariaRoleDescription**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2685

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRoleDescription)

#### Inherited from

`HTMLElement.ariaRoleDescription`

***

### ariaRowCount

> **ariaRowCount**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2687

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowCount)

#### Inherited from

`HTMLElement.ariaRowCount`

***

### ariaRowIndex

> **ariaRowIndex**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2689

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndex)

#### Inherited from

`HTMLElement.ariaRowIndex`

***

### ariaRowIndexText

> **ariaRowIndexText**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2691

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndexText)

#### Inherited from

`HTMLElement.ariaRowIndexText`

***

### ariaRowSpan

> **ariaRowSpan**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2693

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowSpan)

#### Inherited from

`HTMLElement.ariaRowSpan`

***

### ariaSelected

> **ariaSelected**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2695

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSelected)

#### Inherited from

`HTMLElement.ariaSelected`

***

### ariaSetSize

> **ariaSetSize**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2697

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSetSize)

#### Inherited from

`HTMLElement.ariaSetSize`

***

### ariaSort

> **ariaSort**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2699

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSort)

#### Inherited from

`HTMLElement.ariaSort`

***

### ariaValueMax

> **ariaValueMax**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2701

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueMax)

#### Inherited from

`HTMLElement.ariaValueMax`

***

### ariaValueMin

> **ariaValueMin**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2703

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueMin)

#### Inherited from

`HTMLElement.ariaValueMin`

***

### ariaValueNow

> **ariaValueNow**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2705

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueNow)

#### Inherited from

`HTMLElement.ariaValueNow`

***

### ariaValueText

> **ariaValueText**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2707

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueText)

#### Inherited from

`HTMLElement.ariaValueText`

***

### assignedSlot

> `readonly` **assignedSlot**: `HTMLSlotElement` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:30826

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/assignedSlot)

#### Inherited from

`HTMLElement.assignedSlot`

***

### ATTRIBUTE\_NODE

> `readonly` **ATTRIBUTE\_NODE**: `2`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21835

#### Inherited from

`HTMLElement.ATTRIBUTE_NODE`

***

### attributes

> `readonly` **attributes**: `NamedNodeMap`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10707

The **`Element.attributes`** property returns a live collection of all attribute nodes registered to the specified node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/attributes)

#### Inherited from

`HTMLElement.attributes`

***

### attributeStyleMap

> `readonly` **attributeStyleMap**: `StylePropertyMap`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11117

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/attributeStyleMap)

#### Inherited from

`HTMLElement.attributeStyleMap`

***

### autocapitalize

> **autocapitalize**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13700

The **`autocapitalize`** property of the HTMLElement interface represents the element's capitalization behavior for user input.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autocapitalize)

#### Inherited from

`HTMLElement.autocapitalize`

***

### autocorrect

> **autocorrect**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13706

The **`autocorrect`** property of the HTMLElement interface controls whether or not autocorrection of editable text is enabled for spelling and/or punctuation errors.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autocorrect)

#### Inherited from

`HTMLElement.autocorrect`

***

### autofocus

> **autofocus**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:16065

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autofocus)

#### Inherited from

`HTMLElement.autofocus`

***

### baseURI

> `readonly` **baseURI**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21664

The read-only **`baseURI`** property of the Node interface returns the absolute base URL of the document containing the node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/baseURI)

#### Inherited from

`HTMLElement.baseURI`

***

### CDATA\_SECTION\_NODE

> `readonly` **CDATA\_SECTION\_NODE**: `4`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21839

node is a CDATASection node.

#### Inherited from

`HTMLElement.CDATA_SECTION_NODE`

***

### className

> **className**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10720

The **`className`** property of the of the specified element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/className)

#### Inherited from

`HTMLElement.className`

***

### clientHeight

> `readonly` **clientHeight**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10726

The **`clientHeight`** read-only property of the Element interface is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientHeight)

#### Inherited from

`HTMLElement.clientHeight`

***

### clientLeft

> `readonly` **clientLeft**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10732

The **`clientLeft`** read-only property of the Element interface returns the width of the left border of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientLeft)

#### Inherited from

`HTMLElement.clientLeft`

***

### clientTop

> `readonly` **clientTop**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10738

The **`clientTop`** read-only property of the Element interface returns the width of the top border of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientTop)

#### Inherited from

`HTMLElement.clientTop`

***

### clientWidth

> `readonly` **clientWidth**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10744

The **`clientWidth`** read-only property of the Element interface is zero for inline elements and elements with no CSS; otherwise, it's the inner width of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientWidth)

#### Inherited from

`HTMLElement.clientWidth`

***

### COMMENT\_NODE

> `readonly` **COMMENT\_NODE**: `8`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21845

node is a Comment node.

#### Inherited from

`HTMLElement.COMMENT_NODE`

***

### contentEditable

> **contentEditable**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11125

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/contentEditable)

#### Inherited from

`HTMLElement.contentEditable`

***

### currentCSSZoom

> `readonly` **currentCSSZoom**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10750

The **`currentCSSZoom`** read-only property of the Element interface provides the 'effective' CSS `zoom` of an element, taking into account the zoom applied to the element and all its parent elements.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/currentCSSZoom)

#### Inherited from

`HTMLElement.currentCSSZoom`

***

### dataset

> `readonly` **dataset**: `DOMStringMap`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:16067

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dataset)

#### Inherited from

`HTMLElement.dataset`

***

### dir

> **dir**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13712

The **`HTMLElement.dir`** property indicates the text writing directionality of the content of the current element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dir)

#### Inherited from

`HTMLElement.dir`

***

### DOCUMENT\_FRAGMENT\_NODE

> `readonly` **DOCUMENT\_FRAGMENT\_NODE**: `11`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21851

node is a DocumentFragment node.

#### Inherited from

`HTMLElement.DOCUMENT_FRAGMENT_NODE`

***

### DOCUMENT\_NODE

> `readonly` **DOCUMENT\_NODE**: `9`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21847

node is a document.

#### Inherited from

`HTMLElement.DOCUMENT_NODE`

***

### DOCUMENT\_POSITION\_CONTAINED\_BY

> `readonly` **DOCUMENT\_POSITION\_CONTAINED\_BY**: `16`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21862

Set when other is a descendant of node.

#### Inherited from

`HTMLElement.DOCUMENT_POSITION_CONTAINED_BY`

***

### DOCUMENT\_POSITION\_CONTAINS

> `readonly` **DOCUMENT\_POSITION\_CONTAINS**: `8`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21860

Set when other is an ancestor of node.

#### Inherited from

`HTMLElement.DOCUMENT_POSITION_CONTAINS`

***

### DOCUMENT\_POSITION\_DISCONNECTED

> `readonly` **DOCUMENT\_POSITION\_DISCONNECTED**: `1`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21854

Set when node and other are not in the same tree.

#### Inherited from

`HTMLElement.DOCUMENT_POSITION_DISCONNECTED`

***

### DOCUMENT\_POSITION\_FOLLOWING

> `readonly` **DOCUMENT\_POSITION\_FOLLOWING**: `4`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21858

Set when other is following node.

#### Inherited from

`HTMLElement.DOCUMENT_POSITION_FOLLOWING`

***

### DOCUMENT\_POSITION\_IMPLEMENTATION\_SPECIFIC

> `readonly` **DOCUMENT\_POSITION\_IMPLEMENTATION\_SPECIFIC**: `32`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21863

#### Inherited from

`HTMLElement.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC`

***

### DOCUMENT\_POSITION\_PRECEDING

> `readonly` **DOCUMENT\_POSITION\_PRECEDING**: `2`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21856

Set when other is preceding node.

#### Inherited from

`HTMLElement.DOCUMENT_POSITION_PRECEDING`

***

### DOCUMENT\_TYPE\_NODE

> `readonly` **DOCUMENT\_TYPE\_NODE**: `10`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21849

node is a doctype.

#### Inherited from

`HTMLElement.DOCUMENT_TYPE_NODE`

***

### draggable

> **draggable**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13718

The **`draggable`** property of the HTMLElement interface gets and sets a Boolean primitive indicating if the element is draggable.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/draggable)

#### Inherited from

`HTMLElement.draggable`

***

### ELEMENT\_NODE

> `readonly` **ELEMENT\_NODE**: `1`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21834

node is an element.

#### Inherited from

`HTMLElement.ELEMENT_NODE`

***

### enterKeyHint

> **enterKeyHint**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11127

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/enterKeyHint)

#### Inherited from

`HTMLElement.enterKeyHint`

***

### ENTITY\_NODE

> `readonly` **ENTITY\_NODE**: `6`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21841

#### Inherited from

`HTMLElement.ENTITY_NODE`

***

### ENTITY\_REFERENCE\_NODE

> `readonly` **ENTITY\_REFERENCE\_NODE**: `5`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21840

#### Inherited from

`HTMLElement.ENTITY_REFERENCE_NODE`

***

### firstElementChild

> `readonly` **firstElementChild**: `Element` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22680

Returns the first child that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/firstElementChild)

#### Inherited from

`HTMLElement.firstElementChild`

***

### firstChild

> `readonly` **firstChild**: `ChildNode` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21676

The read-only **`firstChild`** property of the Node interface returns the node's first child in the tree, or `null` if the node has no children.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/firstChild)

#### Inherited from

`HTMLElement.firstChild`

***

### hidden

> **hidden**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13724

The HTMLElement property **`hidden`** reflects the value of the element's `hidden` attribute.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/hidden)

#### Inherited from

`HTMLElement.hidden`

***

### childElementCount

> `readonly` **childElementCount**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22668

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/childElementCount)

#### Inherited from

`HTMLElement.childElementCount`

***

### childNodes

> `readonly` **childNodes**: `NodeListOf`\<`ChildNode`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21670

The read-only **`childNodes`** property of the Node interface returns a live the first child node is assigned index `0`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/childNodes)

#### Inherited from

`HTMLElement.childNodes`

***

### children

> `readonly` **children**: `HTMLCollection`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22674

Returns the child elements.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/children)

#### Inherited from

`HTMLElement.children`

***

### id

> **id**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10756

The **`id`** property of the Element interface represents the element's identifier, reflecting the **`id`** global attribute.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/id)

#### Inherited from

`HTMLElement.id`

***

### inert

> **inert**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13730

The HTMLElement property **`inert`** reflects the value of the element's `inert` attribute.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/inert)

#### Inherited from

`HTMLElement.inert`

***

### innerHTML

> **innerHTML**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10762

The **`innerHTML`** property of the Element interface gets or sets the HTML or XML markup contained within the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/innerHTML)

#### Inherited from

`HTMLElement.innerHTML`

***

### innerText

> **innerText**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13736

The **`innerText`** property of the HTMLElement interface represents the rendered text content of a node and its descendants.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText)

#### Inherited from

`HTMLElement.innerText`

***

### inputMode

> **inputMode**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11129

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/inputMode)

#### Inherited from

`HTMLElement.inputMode`

***

### isConnected

> `readonly` **isConnected**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21682

The read-only **`isConnected`** property of the Node interface returns a boolean indicating whether the node is connected (directly or indirectly) to a Document object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isConnected)

#### Inherited from

`HTMLElement.isConnected`

***

### isContentEditable

> `readonly` **isContentEditable**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11131

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/isContentEditable)

#### Inherited from

`HTMLElement.isContentEditable`

***

### lang

> **lang**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13742

The **`lang`** property of the HTMLElement interface indicates the base language of an element's attribute values and text content, in the form of a MISSING: RFC(5646, 'BCP 47 language identifier tag')].

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/lang)

#### Inherited from

`HTMLElement.lang`

***

### lastElementChild

> `readonly` **lastElementChild**: `Element` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22686

Returns the last child that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/lastElementChild)

#### Inherited from

`HTMLElement.lastElementChild`

***

### lastChild

> `readonly` **lastChild**: `ChildNode` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21688

The read-only **`lastChild`** property of the Node interface returns the last child of the node, or `null` if there are no child nodes.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/lastChild)

#### Inherited from

`HTMLElement.lastChild`

***

### localName

> `readonly` **localName**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10768

The **`Element.localName`** read-only property returns the local part of the qualified name of an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/localName)

#### Inherited from

`HTMLElement.localName`

***

### namespaceURI

> `readonly` **namespaceURI**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10774

The **`Element.namespaceURI`** read-only property returns the namespace URI of the element, or `null` if the element is not in a namespace.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/namespaceURI)

#### Inherited from

`HTMLElement.namespaceURI`

***

### nextElementSibling

> `readonly` **nextElementSibling**: `Element` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22003

Returns the first following sibling that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/nextElementSibling)

#### Inherited from

`HTMLElement.nextElementSibling`

***

### nextSibling

> `readonly` **nextSibling**: `ChildNode` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21694

The read-only **`nextSibling`** property of the Node interface returns the node immediately following the specified one in their parent's Node.childNodes, or returns `null` if the specified node is the last child in the parent element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)

#### Inherited from

`HTMLElement.nextSibling`

***

### nodeName

> `readonly` **nodeName**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21700

The read-only **`nodeName`** property of Node returns the name of the current node as a string.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nodeName)

#### Inherited from

`HTMLElement.nodeName`

***

### nodeType

> `readonly` **nodeType**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21706

The read-only **`nodeType`** property of a Node interface is an integer that identifies what the node is.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nodeType)

#### Inherited from

`HTMLElement.nodeType`

***

### nodeValue

> **nodeValue**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21712

The **`nodeValue`** property of the Node interface returns or sets the value of the current node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nodeValue)

#### Inherited from

`HTMLElement.nodeValue`

***

### nonce?

> `optional` **nonce**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:16069

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/nonce)

#### Inherited from

`HTMLElement.nonce`

***

### NOTATION\_NODE

> `readonly` **NOTATION\_NODE**: `12`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21852

#### Inherited from

`HTMLElement.NOTATION_NODE`

***

### offsetHeight

> `readonly` **offsetHeight**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13748

The **`offsetHeight`** read-only property of the HTMLElement interface returns the height of an element, including vertical padding and borders, as an integer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetHeight)

#### Inherited from

`HTMLElement.offsetHeight`

***

### offsetLeft

> `readonly` **offsetLeft**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13754

The **`offsetLeft`** read-only property of the HTMLElement interface returns the number of pixels that the _upper left corner_ of the current element is offset to the left within the HTMLElement.offsetParent node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetLeft)

#### Inherited from

`HTMLElement.offsetLeft`

***

### offsetParent

> `readonly` **offsetParent**: `Element` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13760

The **`HTMLElement.offsetParent`** read-only property returns a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetParent)

#### Inherited from

`HTMLElement.offsetParent`

***

### offsetTop

> `readonly` **offsetTop**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13766

The **`offsetTop`** read-only property of the HTMLElement interface returns the distance from the outer border of the current element (including its margin) to the top padding edge of the HTMLelement.offsetParent, the _closest positioned_ ancestor element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetTop)

#### Inherited from

`HTMLElement.offsetTop`

***

### offsetWidth

> `readonly` **offsetWidth**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13772

The **`offsetWidth`** read-only property of the HTMLElement interface returns the layout width of an element as an integer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetWidth)

#### Inherited from

`HTMLElement.offsetWidth`

***

### onabort

> **onabort**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12743

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event)

#### Inherited from

`HTMLElement.onabort`

***

### onanimationcancel

> **onanimationcancel**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12745

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationcancel_event)

#### Inherited from

`HTMLElement.onanimationcancel`

***

### onanimationend

> **onanimationend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12747

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)

#### Inherited from

`HTMLElement.onanimationend`

***

### onanimationiteration

> **onanimationiteration**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12749

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)

#### Inherited from

`HTMLElement.onanimationiteration`

***

### onanimationstart

> **onanimationstart**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12751

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)

#### Inherited from

`HTMLElement.onanimationstart`

***

### onauxclick

> **onauxclick**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12753

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/auxclick_event)

#### Inherited from

`HTMLElement.onauxclick`

***

### onbeforeinput

> **onbeforeinput**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12755

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/beforeinput_event)

#### Inherited from

`HTMLElement.onbeforeinput`

***

### onbeforematch

> **onbeforematch**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12757

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/beforematch_event)

#### Inherited from

`HTMLElement.onbeforematch`

***

### onbeforetoggle

> **onbeforetoggle**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12759

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/beforetoggle_event)

#### Inherited from

`HTMLElement.onbeforetoggle`

***

### onblur

> **onblur**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12761

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/blur_event)

#### Inherited from

`HTMLElement.onblur`

***

### oncancel

> **oncancel**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12763

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event)

#### Inherited from

`HTMLElement.oncancel`

***

### oncanplay

> **oncanplay**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12765

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event)

#### Inherited from

`HTMLElement.oncanplay`

***

### oncanplaythrough

> **oncanplaythrough**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12767

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event)

#### Inherited from

`HTMLElement.oncanplaythrough`

***

### onclick

> **onclick**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12771

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/click_event)

#### Inherited from

`HTMLElement.onclick`

***

### onclose

> **onclose**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12773

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close_event)

#### Inherited from

`HTMLElement.onclose`

***

### oncontextlost

> **oncontextlost**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12775

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/contextlost_event)

#### Inherited from

`HTMLElement.oncontextlost`

***

### oncontextmenu

> **oncontextmenu**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12777

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/contextmenu_event)

#### Inherited from

`HTMLElement.oncontextmenu`

***

### oncontextrestored

> **oncontextrestored**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12779

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/contextrestored_event)

#### Inherited from

`HTMLElement.oncontextrestored`

***

### oncopy

> **oncopy**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12781

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/copy_event)

#### Inherited from

`HTMLElement.oncopy`

***

### oncuechange

> **oncuechange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12783

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/cuechange_event)

#### Inherited from

`HTMLElement.oncuechange`

***

### oncut

> **oncut**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12785

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/cut_event)

#### Inherited from

`HTMLElement.oncut`

***

### ondblclick

> **ondblclick**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12787

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/dblclick_event)

#### Inherited from

`HTMLElement.ondblclick`

***

### ondrag

> **ondrag**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12789

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drag_event)

#### Inherited from

`HTMLElement.ondrag`

***

### ondragend

> **ondragend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12791

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragend_event)

#### Inherited from

`HTMLElement.ondragend`

***

### ondragenter

> **ondragenter**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12793

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragenter_event)

#### Inherited from

`HTMLElement.ondragenter`

***

### ondragleave

> **ondragleave**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12795

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragleave_event)

#### Inherited from

`HTMLElement.ondragleave`

***

### ondragover

> **ondragover**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12797

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragover_event)

#### Inherited from

`HTMLElement.ondragover`

***

### ondragstart

> **ondragstart**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12799

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragstart_event)

#### Inherited from

`HTMLElement.ondragstart`

***

### ondrop

> **ondrop**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12801

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drop_event)

#### Inherited from

`HTMLElement.ondrop`

***

### ondurationchange

> **ondurationchange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12803

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event)

#### Inherited from

`HTMLElement.ondurationchange`

***

### onemptied

> **onemptied**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12805

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event)

#### Inherited from

`HTMLElement.onemptied`

***

### onended

> **onended**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12807

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event)

#### Inherited from

`HTMLElement.onended`

***

### onerror

> **onerror**: `OnErrorEventHandler`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12809

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/error_event)

#### Inherited from

`HTMLElement.onerror`

***

### onfocus

> **onfocus**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12811

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/focus_event)

#### Inherited from

`HTMLElement.onfocus`

***

### onformdata

> **onformdata**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12813

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/formdata_event)

#### Inherited from

`HTMLElement.onformdata`

***

### onfullscreenerror

> **onfullscreenerror**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10778

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/fullscreenerror_event)

#### Inherited from

`HTMLElement.onfullscreenerror`

***

### onfullscreenchange

> **onfullscreenchange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10776

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/fullscreenchange_event)

#### Inherited from

`HTMLElement.onfullscreenchange`

***

### ongotpointercapture

> **ongotpointercapture**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12815

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/gotpointercapture_event)

#### Inherited from

`HTMLElement.ongotpointercapture`

***

### onchange

> **onchange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12769

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)

#### Inherited from

`HTMLElement.onchange`

***

### oninput

> **oninput**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12817

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/input_event)

#### Inherited from

`HTMLElement.oninput`

***

### oninvalid

> **oninvalid**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12819

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/invalid_event)

#### Inherited from

`HTMLElement.oninvalid`

***

### onkeydown

> **onkeydown**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12821

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keydown_event)

#### Inherited from

`HTMLElement.onkeydown`

***

### ~~onkeypress~~

> **onkeypress**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12827

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keypress_event)

#### Inherited from

`HTMLElement.onkeypress`

***

### onkeyup

> **onkeyup**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keyup_event)

#### Inherited from

`HTMLElement.onkeyup`

***

### onload

> **onload**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12831

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/load_event)

#### Inherited from

`HTMLElement.onload`

***

### onloadeddata

> **onloadeddata**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12833

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event)

#### Inherited from

`HTMLElement.onloadeddata`

***

### onloadedmetadata

> **onloadedmetadata**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12835

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event)

#### Inherited from

`HTMLElement.onloadedmetadata`

***

### onloadstart

> **onloadstart**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12837

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadstart_event)

#### Inherited from

`HTMLElement.onloadstart`

***

### onlostpointercapture

> **onlostpointercapture**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12839

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/lostpointercapture_event)

#### Inherited from

`HTMLElement.onlostpointercapture`

***

### onmousedown

> **onmousedown**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12841

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousedown_event)

#### Inherited from

`HTMLElement.onmousedown`

***

### onmouseenter

> **onmouseenter**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12843

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseenter_event)

#### Inherited from

`HTMLElement.onmouseenter`

***

### onmouseleave

> **onmouseleave**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12845

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseleave_event)

#### Inherited from

`HTMLElement.onmouseleave`

***

### onmousemove

> **onmousemove**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12847

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousemove_event)

#### Inherited from

`HTMLElement.onmousemove`

***

### onmouseout

> **onmouseout**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12849

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseout_event)

#### Inherited from

`HTMLElement.onmouseout`

***

### onmouseover

> **onmouseover**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12851

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseover_event)

#### Inherited from

`HTMLElement.onmouseover`

***

### onmouseup

> **onmouseup**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12853

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseup_event)

#### Inherited from

`HTMLElement.onmouseup`

***

### onpaste

> **onpaste**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12855

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/paste_event)

#### Inherited from

`HTMLElement.onpaste`

***

### onpause

> **onpause**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12857

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event)

#### Inherited from

`HTMLElement.onpause`

***

### onplay

> **onplay**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12859

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event)

#### Inherited from

`HTMLElement.onplay`

***

### onplaying

> **onplaying**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12861

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event)

#### Inherited from

`HTMLElement.onplaying`

***

### onpointercancel

> **onpointercancel**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12863

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointercancel_event)

#### Inherited from

`HTMLElement.onpointercancel`

***

### onpointerdown

> **onpointerdown**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12865

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerdown_event)

#### Inherited from

`HTMLElement.onpointerdown`

***

### onpointerenter

> **onpointerenter**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12867

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerenter_event)

#### Inherited from

`HTMLElement.onpointerenter`

***

### onpointerleave

> **onpointerleave**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12869

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerleave_event)

#### Inherited from

`HTMLElement.onpointerleave`

***

### onpointermove

> **onpointermove**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12871

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointermove_event)

#### Inherited from

`HTMLElement.onpointermove`

***

### onpointerout

> **onpointerout**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12873

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerout_event)

#### Inherited from

`HTMLElement.onpointerout`

***

### onpointerover

> **onpointerover**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12875

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerover_event)

#### Inherited from

`HTMLElement.onpointerover`

***

### onpointerrawupdate

> **onpointerrawupdate**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12881

Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerrawupdate_event)

#### Inherited from

`HTMLElement.onpointerrawupdate`

***

### onpointerup

> **onpointerup**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12883

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerup_event)

#### Inherited from

`HTMLElement.onpointerup`

***

### onprogress

> **onprogress**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12885

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/progress_event)

#### Inherited from

`HTMLElement.onprogress`

***

### onratechange

> **onratechange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12887

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event)

#### Inherited from

`HTMLElement.onratechange`

***

### onreset

> **onreset**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12889

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset_event)

#### Inherited from

`HTMLElement.onreset`

***

### onresize

> **onresize**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12891

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/resize_event)

#### Inherited from

`HTMLElement.onresize`

***

### onscroll

> **onscroll**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12893

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scroll_event)

#### Inherited from

`HTMLElement.onscroll`

***

### onscrollend

> **onscrollend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12895

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scrollend_event)

#### Inherited from

`HTMLElement.onscrollend`

***

### onsecuritypolicyviolation

> **onsecuritypolicyviolation**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12897

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/securitypolicyviolation_event)

#### Inherited from

`HTMLElement.onsecuritypolicyviolation`

***

### onseeked

> **onseeked**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12899

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event)

#### Inherited from

`HTMLElement.onseeked`

***

### onseeking

> **onseeking**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12901

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event)

#### Inherited from

`HTMLElement.onseeking`

***

### onselect

> **onselect**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12903

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event)

#### Inherited from

`HTMLElement.onselect`

***

### onselectionchange

> **onselectionchange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12905

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/selectionchange_event)

#### Inherited from

`HTMLElement.onselectionchange`

***

### onselectstart

> **onselectstart**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12907

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/selectstart_event)

#### Inherited from

`HTMLElement.onselectstart`

***

### onslotchange

> **onslotchange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12909

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/slotchange_event)

#### Inherited from

`HTMLElement.onslotchange`

***

### onstalled

> **onstalled**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12911

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event)

#### Inherited from

`HTMLElement.onstalled`

***

### onsubmit

> **onsubmit**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12913

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit_event)

#### Inherited from

`HTMLElement.onsubmit`

***

### onsuspend

> **onsuspend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12915

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event)

#### Inherited from

`HTMLElement.onsuspend`

***

### ontimeupdate

> **ontimeupdate**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12917

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event)

#### Inherited from

`HTMLElement.ontimeupdate`

***

### ontoggle

> **ontoggle**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12919

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/toggle_event)

#### Inherited from

`HTMLElement.ontoggle`

***

### ontouchcancel?

> `optional` **ontouchcancel**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12921

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchcancel_event)

#### Inherited from

`HTMLElement.ontouchcancel`

***

### ontouchend?

> `optional` **ontouchend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12923

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchend_event)

#### Inherited from

`HTMLElement.ontouchend`

***

### ontouchmove?

> `optional` **ontouchmove**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12925

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchmove_event)

#### Inherited from

`HTMLElement.ontouchmove`

***

### ontouchstart?

> `optional` **ontouchstart**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12927

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchstart_event)

#### Inherited from

`HTMLElement.ontouchstart`

***

### ontransitioncancel

> **ontransitioncancel**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12929

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitioncancel_event)

#### Inherited from

`HTMLElement.ontransitioncancel`

***

### ontransitionend

> **ontransitionend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12931

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)

#### Inherited from

`HTMLElement.ontransitionend`

***

### ontransitionrun

> **ontransitionrun**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12933

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionrun_event)

#### Inherited from

`HTMLElement.ontransitionrun`

***

### ontransitionstart

> **ontransitionstart**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12935

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionstart_event)

#### Inherited from

`HTMLElement.ontransitionstart`

***

### onvolumechange

> **onvolumechange**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12937

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event)

#### Inherited from

`HTMLElement.onvolumechange`

***

### onwaiting

> **onwaiting**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12939

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event)

#### Inherited from

`HTMLElement.onwaiting`

***

### ~~onwebkitanimationend~~

> **onwebkitanimationend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12945

#### Deprecated

This is a legacy alias of `onanimationend`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)

#### Inherited from

`HTMLElement.onwebkitanimationend`

***

### ~~onwebkitanimationiteration~~

> **onwebkitanimationiteration**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12951

#### Deprecated

This is a legacy alias of `onanimationiteration`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)

#### Inherited from

`HTMLElement.onwebkitanimationiteration`

***

### ~~onwebkitanimationstart~~

> **onwebkitanimationstart**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12957

#### Deprecated

This is a legacy alias of `onanimationstart`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)

#### Inherited from

`HTMLElement.onwebkitanimationstart`

***

### ~~onwebkittransitionend~~

> **onwebkittransitionend**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12963

#### Deprecated

This is a legacy alias of `ontransitionend`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)

#### Inherited from

`HTMLElement.onwebkittransitionend`

***

### onwheel

> **onwheel**: (`this`, `ev`) => `any` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:12965

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/wheel_event)

#### Inherited from

`HTMLElement.onwheel`

***

### outerHTML

> **outerHTML**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10784

The **`outerHTML`** attribute of the Element DOM interface gets the serialized HTML fragment describing the element including its descendants.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/outerHTML)

#### Inherited from

`HTMLElement.outerHTML`

***

### outerText

> **outerText**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13778

The **`outerText`** property of the HTMLElement interface returns the same value as HTMLElement.innerText.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/outerText)

#### Inherited from

`HTMLElement.outerText`

***

### ownerDocument

> `readonly` **ownerDocument**: `Document`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10785

The read-only **`ownerDocument`** property of the Node interface returns the top-level document object of the node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/ownerDocument)

#### Inherited from

`HTMLElement.ownerDocument`

***

### parentElement

> `readonly` **parentElement**: `HTMLElement` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21724

The read-only **`parentElement`** property of Node interface returns the DOM node's parent Element, or `null` if the node either has no parent, or its parent isn't a DOM Element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/parentElement)

#### Inherited from

`HTMLElement.parentElement`

***

### parentNode

> `readonly` **parentNode**: `ParentNode` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21730

The read-only **`parentNode`** property of the Node interface returns the parent of the specified node in the DOM tree.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/parentNode)

#### Inherited from

`HTMLElement.parentNode`

***

### popover

> **popover**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13784

The **`popover`** property of the HTMLElement interface gets and sets an element's popover state via JavaScript (`'auto'`, `'hint'`, or `'manual'`), and can be used for feature detection.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/popover)

#### Inherited from

`HTMLElement.popover`

***

### prefix

> `readonly` **prefix**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10798

The **`Element.prefix`** read-only property returns the namespace prefix of the specified element, or `null` if no prefix is specified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/prefix)

#### Inherited from

`HTMLElement.prefix`

***

### previousElementSibling

> `readonly` **previousElementSibling**: `Element` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22009

Returns the first preceding sibling that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/previousElementSibling)

#### Inherited from

`HTMLElement.previousElementSibling`

***

### previousSibling

> `readonly` **previousSibling**: `ChildNode` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21736

The read-only **`previousSibling`** property of the Node interface returns the node immediately preceding the specified one in its parent's or `null` if the specified node is the first in that list.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/previousSibling)

#### Inherited from

`HTMLElement.previousSibling`

***

### PROCESSING\_INSTRUCTION\_NODE

> `readonly` **PROCESSING\_INSTRUCTION\_NODE**: `7`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21843

node is a ProcessingInstruction node.

#### Inherited from

`HTMLElement.PROCESSING_INSTRUCTION_NODE`

***

### role

> **role**: `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2709

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/role)

#### Inherited from

`HTMLElement.role`

***

### scrollHeight

> `readonly` **scrollHeight**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10804

The **`scrollHeight`** read-only property of the Element interface is a measurement of the height of an element's content, including content not visible on the screen due to overflow.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollHeight)

#### Inherited from

`HTMLElement.scrollHeight`

***

### scrollLeft

> **scrollLeft**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10810

The **`scrollLeft`** property of the Element interface gets or sets the number of pixels by which an element's content is scrolled from its left edge.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollLeft)

#### Inherited from

`HTMLElement.scrollLeft`

***

### scrollTop

> **scrollTop**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10816

The **`scrollTop`** property of the Element interface gets or sets the number of pixels by which an element's content is scrolled from its top edge.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollTop)

#### Inherited from

`HTMLElement.scrollTop`

***

### scrollWidth

> `readonly` **scrollWidth**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10822

The **`scrollWidth`** read-only property of the Element interface is a measurement of the width of an element's content, including content not visible on the screen due to overflow.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollWidth)

#### Inherited from

`HTMLElement.scrollWidth`

***

### shadowRoot

> `readonly` **shadowRoot**: `ShadowRoot` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10828

The `Element.shadowRoot` read-only property represents the shadow root hosted by the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/shadowRoot)

#### Inherited from

`HTMLElement.shadowRoot`

***

### slot

> **slot**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10834

The **`slot`** property of the Element interface returns the name of the shadow DOM slot the element is inserted in.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/slot)

#### Inherited from

`HTMLElement.slot`

***

### spellcheck

> **spellcheck**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13790

The **`spellcheck`** property of the HTMLElement interface represents a boolean value that controls the spell-checking hint.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/spellcheck)

#### Inherited from

`HTMLElement.spellcheck`

***

### tabIndex

> **tabIndex**: `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:16071

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/tabIndex)

#### Inherited from

`HTMLElement.tabIndex`

***

### tagName

> `readonly` **tagName**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10840

The **`tagName`** read-only property of the Element interface returns the tag name of the element on which it's called.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/tagName)

#### Inherited from

`HTMLElement.tagName`

***

### TEXT\_NODE

> `readonly` **TEXT\_NODE**: `3`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21837

node is a Text node.

#### Inherited from

`HTMLElement.TEXT_NODE`

***

### title

> **title**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13796

The **`HTMLElement.title`** property represents the title of the element: the text usually displayed in a 'tooltip' popup when the mouse is over the node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/title)

#### Inherited from

`HTMLElement.title`

***

### translate

> **translate**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13802

The **`translate`** property of the HTMLElement interface indicates whether an element's attribute values and the values of its Text node children are to be translated when the page is localized, or whether to leave them unchanged.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/translate)

#### Inherited from

`HTMLElement.translate`

***

### writingSuggestions

> **writingSuggestions**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13808

The **`writingSuggestions`** property of the HTMLElement interface is a string indicating if browser-provided writing suggestions should be enabled under the scope of the element or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/writingSuggestions)

#### Inherited from

`HTMLElement.writingSuggestions`

***

### VERBOSITY\_ERROR

> `readonly` `static` **VERBOSITY\_ERROR**: `"error"` = `'error'`

Defined in: [src/polyfea-context.ts:53](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L53)

Verbosity level error

#### See

verbosity

***

### VERBOSITY\_SILENT

> `readonly` `static` **VERBOSITY\_SILENT**: `"silent"` = `'silent'`

Defined in: [src/polyfea-context.ts:50](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L50)

Verbosity level silent

#### See

verbosity

***

### VERBOSITY\_VERBOSE

> `readonly` `static` **VERBOSITY\_VERBOSE**: `"verbose"` = `'verbose'`

Defined in: [src/polyfea-context.ts:56](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L56)

Verbosity level verbose

#### See

verbosity

## Accessors

### classList

#### Get Signature

> **get** **classList**(): `DOMTokenList`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10713

The **`Element.classList`** is a read-only property that returns a live DOMTokenList collection of the `class` attributes of the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/classList)

##### Returns

`DOMTokenList`

#### Set Signature

> **set** **classList**(`value`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10714

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

`HTMLElement.classList`

***

### contextName

#### Get Signature

> **get** **contextName**(): `string`

Defined in: [src/polyfea-context.ts:72](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L72)

The name of the context area to load. Either `context-name` or `name` shall be set.
 The property `context-name` takes priority if it is set

##### Attr

context-name

##### Returns

`string`

#### Set Signature

> **set** **contextName**(`name`): `void`

Defined in: [src/polyfea-context.ts:63](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L63)

The name of the context area to load. Either `context-name` or `name` shall be set.
 The property `context-name` takes priority if it is set

##### Attr

context-name

##### Parameters

###### name

`string`

##### Returns

`void`

***

### error

#### Get Signature

> **get** **error**(): `string` \| `null`

Defined in: [src/polyfea-context.ts:248](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L248)

If an error occurs during context area retrieval or loading of dependencies,
 this attribute is set with the error message. Otherwise, it is null.

##### Attr

error

##### Returns

`string` \| `null`

***

### extraAttributes

#### Get Signature

> **get** **extraAttributes**(): `object`

Defined in: [src/polyfea-context.ts:140](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L140)

Defines additional attributes to be set on the rendered elements.

##### Remarks

The attributes are set in the following order:

1. The `context` attribute, with its value set to the `name` property.
2. The attributes defined in the element specification of the context area.
3. The attributes defined in this property.

##### Attr

extra-attributes

##### Returns

`object`

#### Set Signature

> **set** **extraAttributes**(`attrs`): `void`

Defined in: [src/polyfea-context.ts:159](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L159)

Defines additional attributes to be set on the rendered elements.

##### Remarks

The attributes are set in the following order:

1. The `context` attribute, with its value set to the `name` property.
2. The attributes defined in the element specification of the context area.
3. The attributes defined in this property.

##### Attr

extra-attributes

##### Parameters

###### attrs

##### Returns

`void`

***

### extraStyle

#### Get Signature

> **get** **extraStyle**(): `object`

Defined in: [src/polyfea-context.ts:186](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L186)

Additional style properties to be set on the rendered elements.

##### Remarks

The style properties are set in the following order:
1. Style properties defined in the element specification of the context area.
2. Style properties defined in this property.

##### Attr

extra-style

##### Returns

`object`

#### Set Signature

> **set** **extraStyle**(`style`): `void`

Defined in: [src/polyfea-context.ts:173](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L173)

Additional style properties to be set on the rendered elements.

##### Remarks

The style properties are set in the following order:

1. Style properties defined in the element specification of the context area.
2. Style properties defined in this property.

##### Attr

extra-style

##### Parameters

###### style

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [src/polyfea-context.ts:95](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L95)

The name of the context area to load. Either `context-name` or `name` shall be set.
 The property `context-name` takes priority if it is set

##### Attr

name

##### Returns

`string`

#### Set Signature

> **set** **name**(`name`): `void`

Defined in: [src/polyfea-context.ts:85](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L85)

The name of the context area to load. Either `context-name` or `name` shall be set.
 The property `context-name` takes priority if it is set

##### Attr

name

##### Parameters

###### name

`string`

##### Returns

`void`

***

### part

#### Get Signature

> **get** **part**(): `DOMTokenList`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10791

The **`part`** property of the Element interface represents the part identifier(s) of the element (i.e., set using the `part` attribute), returned as a DOMTokenList.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/part)

##### Returns

`DOMTokenList`

#### Set Signature

> **set** **part**(`value`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10792

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

`HTMLElement.part`

***

### style

#### Get Signature

> **get** **style**(): `CSSStyleDeclaration`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11119

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/style)

##### Returns

`CSSStyleDeclaration`

#### Set Signature

> **set** **style**(`cssText`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11120

##### Parameters

###### cssText

`string`

##### Returns

`void`

#### Inherited from

`HTMLElement.style`

***

### take

#### Get Signature

> **get** **take**(): `number`

Defined in: [src/polyfea-context.ts:110](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L110)

Specifies the number of context area elements to render.
If this property is unset or has a non-positive value, all configured
elements will be rendered.

##### Attr

take

##### Returns

`number`

#### Set Signature

> **set** **take**(`take`): `void`

Defined in: [src/polyfea-context.ts:125](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L125)

Specifies the number of context area elements to render.
If this property is unset or has a non-positive value, all configured
elements will be rendered.

##### Attr

take

##### Parameters

###### take

`number`

##### Returns

`void`

***

### textContent

#### Get Signature

> **get** **textContent**(): `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11102

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

##### Returns

`string`

#### Set Signature

> **set** **textContent**(`value`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11103

The **`textContent`** property of the Node interface represents the text content of the node and its descendants.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/textContent)

##### Parameters

###### value

`string` | `null`

##### Returns

`void`

#### Inherited from

`HTMLElement.textContent`

***

### verbosity

#### Get Signature

> **get** **verbosity**(): `string`

Defined in: [src/polyfea-context.ts:217](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L217)

The verbosity level of the component.

- `silent`: No logs or warnings are produced.
- `error`: Only warnings about errors during context area loading are produced. This is the default level.
- `verbose`: Detailed logs about context area loading and microfrontend loading are produced.

The verbosity level can also be set globally using a meta tag in the document head:
`<meta name="polyfea.context-verbosity" content="silent|error|verbose">`

##### Attr

verbosity

##### Returns

`string`

#### Set Signature

> **set** **verbosity**(`v`): `void`

Defined in: [src/polyfea-context.ts:239](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L239)

The verbosity level of the component.

- `silent`: No logs or warnings are produced.
- `error`: Only warnings about errors during context area loading are produced. This is the default level.
- `verbose`: Detailed logs about context area loading and microfrontend loading are produced.

The verbosity level can also be set globally using a meta tag in the document head:
`<meta name="polyfea.context-verbosity" content="silent|error|verbose">`

##### Attr

verbosity

##### Parameters

###### v

`string`

##### Returns

`void`

## Methods

### addEventListener()

#### Call Signature

> **addEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13839

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementEventMap`

##### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` | `AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`HTMLElement.addEventListener`

#### Call Signature

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13840

##### Parameters

###### type

`string`

###### listener

`EventListenerOrEventListenerObject`

###### options?

`boolean` | `AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`HTMLElement.addEventListener`

***

### after()

> **after**(...`nodes`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:7953

Inserts nodes just after node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/after)

#### Parameters

##### nodes

...(`string` \| `Node`)[]

#### Returns

`void`

#### Inherited from

`HTMLElement.after`

***

### animate()

> **animate**(`keyframes`, `options?`): `Animation`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2921

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animate)

#### Parameters

##### keyframes

`Keyframe`[] | `PropertyIndexedKeyframes` | `null`

##### options?

`number` | `KeyframeAnimationOptions`

#### Returns

`Animation`

#### Inherited from

`HTMLElement.animate`

***

### append()

> **append**(...`nodes`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22694

Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/append)

#### Parameters

##### nodes

...(`string` \| `Node`)[]

#### Returns

`void`

#### Inherited from

`HTMLElement.append`

***

### appendChild()

> **appendChild**\<`T`\>(`node`): `T`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21748

The **`appendChild()`** method of the Node interface adds a node to the end of the list of children of a specified parent node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/appendChild)

#### Type Parameters

##### T

`T` *extends* `Node`

#### Parameters

##### node

`T`

#### Returns

`T`

#### Inherited from

`HTMLElement.appendChild`

***

### attachInternals()

> **attachInternals**(): `ElementInternals`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13814

The **`HTMLElement.attachInternals()`** method returns an ElementInternals object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/attachInternals)

#### Returns

`ElementInternals`

#### Inherited from

`HTMLElement.attachInternals`

***

### attachShadow()

> **attachShadow**(`init`): `ShadowRoot`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10846

The **`Element.attachShadow()`** method attaches a shadow DOM tree to the specified element and returns a reference to its ShadowRoot.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/attachShadow)

#### Parameters

##### init

`ShadowRootInit`

#### Returns

`ShadowRoot`

#### Inherited from

`HTMLElement.attachShadow`

***

### before()

> **before**(...`nodes`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:7961

Inserts nodes just before node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/before)

#### Parameters

##### nodes

...(`string` \| `Node`)[]

#### Returns

`void`

#### Inherited from

`HTMLElement.before`

***

### blur()

> **blur**(): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:16073

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/blur)

#### Returns

`void`

#### Inherited from

`HTMLElement.blur`

***

### click()

> **click**(): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13820

The **`HTMLElement.click()`** method simulates a mouse click on an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/click)

#### Returns

`void`

#### Inherited from

`HTMLElement.click`

***

### cloneNode()

> **cloneNode**(`subtree?`): `Node`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21754

The **`cloneNode()`** method of the Node interface returns a duplicate of the node on which this method was called.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/cloneNode)

#### Parameters

##### subtree?

`boolean`

#### Returns

`Node`

#### Inherited from

`HTMLElement.cloneNode`

***

### closest()

#### Call Signature

> **closest**\<`K`\>(`selector`): `HTMLElementTagNameMap`\[`K`\] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10858

The **`closest()`** method of the Element interface traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/closest)

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementTagNameMap`

##### Parameters

###### selector

`K`

##### Returns

`HTMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

`HTMLElement.closest`

#### Call Signature

> **closest**\<`K`\>(`selector`): `SVGElementTagNameMap`\[`K`\] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10859

##### Type Parameters

###### K

`K` *extends* keyof `SVGElementTagNameMap`

##### Parameters

###### selector

`K`

##### Returns

`SVGElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

`HTMLElement.closest`

#### Call Signature

> **closest**\<`K`\>(`selector`): `MathMLElementTagNameMap`\[`K`\] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10860

##### Type Parameters

###### K

`K` *extends* keyof `MathMLElementTagNameMap`

##### Parameters

###### selector

`K`

##### Returns

`MathMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

`HTMLElement.closest`

#### Call Signature

> **closest**\<`E`\>(`selectors`): `E` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10861

##### Type Parameters

###### E

`E` *extends* `Element` = `Element`

##### Parameters

###### selectors

`string`

##### Returns

`E` \| `null`

##### Inherited from

`HTMLElement.closest`

***

### compareDocumentPosition()

> **compareDocumentPosition**(`other`): `number`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21760

The **`compareDocumentPosition()`** method of the Node interface reports the position of its argument node relative to the node on which it is called.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/compareDocumentPosition)

#### Parameters

##### other

`Node`

#### Returns

`number`

#### Inherited from

`HTMLElement.compareDocumentPosition`

***

### computedStyleMap()

> **computedStyleMap**(): `StylePropertyMapReadOnly`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10867

The **`computedStyleMap()`** method of the Element interface returns a StylePropertyMapReadOnly interface which provides a read-only representation of a CSS declaration block that is an alternative to CSSStyleDeclaration.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/computedStyleMap)

#### Returns

`StylePropertyMapReadOnly`

#### Inherited from

`HTMLElement.computedStyleMap`

***

### contains()

> **contains**(`other`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21766

The **`contains()`** method of the Node interface returns a boolean value indicating whether a node is a descendant of a given node, that is the node itself, one of its direct children (Node.childNodes), one of the children's direct children, and so on.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/contains)

#### Parameters

##### other

`Node` | `null`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.contains`

***

### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11575

The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

#### Parameters

##### event

`Event`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.dispatchEvent`

***

### focus()

> **focus**(`options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:16075

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/focus)

#### Parameters

##### options?

`FocusOptions`

#### Returns

`void`

#### Inherited from

`HTMLElement.focus`

***

### getAnimations()

> **getAnimations**(`options?`): `Animation`[]

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2923

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAnimations)

#### Parameters

##### options?

`GetAnimationsOptions`

#### Returns

`Animation`[]

#### Inherited from

`HTMLElement.getAnimations`

***

### getAttribute()

> **getAttribute**(`qualifiedName`): `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10873

The **`getAttribute()`** method of the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttribute)

#### Parameters

##### qualifiedName

`string`

#### Returns

`string` \| `null`

#### Inherited from

`HTMLElement.getAttribute`

***

### getAttributeNames()

> **getAttributeNames**(): `string`[]

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10885

The **`getAttributeNames()`** method of the array.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNames)

#### Returns

`string`[]

#### Inherited from

`HTMLElement.getAttributeNames`

***

### getAttributeNode()

> **getAttributeNode**(`qualifiedName`): `Attr` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10891

Returns the specified attribute of the specified element, as an Attr node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNode)

#### Parameters

##### qualifiedName

`string`

#### Returns

`Attr` \| `null`

#### Inherited from

`HTMLElement.getAttributeNode`

***

### getAttributeNodeNS()

> **getAttributeNodeNS**(`namespace`, `localName`): `Attr` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10897

The **`getAttributeNodeNS()`** method of the Element interface returns the namespaced Attr node of an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNodeNS)

#### Parameters

##### namespace

`string` | `null`

##### localName

`string`

#### Returns

`Attr` \| `null`

#### Inherited from

`HTMLElement.getAttributeNodeNS`

***

### getAttributeNS()

> **getAttributeNS**(`namespace`, `localName`): `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10879

The **`getAttributeNS()`** method of the Element interface returns the string value of the attribute with the specified namespace and name.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNS)

#### Parameters

##### namespace

`string` | `null`

##### localName

`string`

#### Returns

`string` \| `null`

#### Inherited from

`HTMLElement.getAttributeNS`

***

### getBoundingClientRect()

> **getBoundingClientRect**(): `DOMRect`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10903

The **`Element.getBoundingClientRect()`** method returns a position relative to the viewport.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getBoundingClientRect)

#### Returns

`DOMRect`

#### Inherited from

`HTMLElement.getBoundingClientRect`

***

### getClientRects()

> **getClientRects**(): `DOMRectList`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10909

The **`getClientRects()`** method of the Element interface returns a collection of DOMRect objects that indicate the bounding rectangles for each CSS border box in a client.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getClientRects)

#### Returns

`DOMRectList`

#### Inherited from

`HTMLElement.getClientRects`

***

### getElementsByClassName()

> **getElementsByClassName**(`classNames`): `HTMLCollectionOf`\<`Element`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10915

The Element method **`getElementsByClassName()`** returns a live specified class name or names.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getElementsByClassName)

#### Parameters

##### classNames

`string`

#### Returns

`HTMLCollectionOf`\<`Element`\>

#### Inherited from

`HTMLElement.getElementsByClassName`

***

### getElementsByTagName()

#### Call Signature

> **getElementsByTagName**\<`K`\>(`qualifiedName`): `HTMLCollectionOf`\<`HTMLElementTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10921

The **`Element.getElementsByTagName()`** method returns a live All descendants of the specified element are searched, but not the element itself.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getElementsByTagName)

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementTagNameMap`

##### Parameters

###### qualifiedName

`K`

##### Returns

`HTMLCollectionOf`\<`HTMLElementTagNameMap`\[`K`\]\>

##### Inherited from

`HTMLElement.getElementsByTagName`

#### Call Signature

> **getElementsByTagName**\<`K`\>(`qualifiedName`): `HTMLCollectionOf`\<`SVGElementTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10922

##### Type Parameters

###### K

`K` *extends* keyof `SVGElementTagNameMap`

##### Parameters

###### qualifiedName

`K`

##### Returns

`HTMLCollectionOf`\<`SVGElementTagNameMap`\[`K`\]\>

##### Inherited from

`HTMLElement.getElementsByTagName`

#### Call Signature

> **getElementsByTagName**\<`K`\>(`qualifiedName`): `HTMLCollectionOf`\<`MathMLElementTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10923

##### Type Parameters

###### K

`K` *extends* keyof `MathMLElementTagNameMap`

##### Parameters

###### qualifiedName

`K`

##### Returns

`HTMLCollectionOf`\<`MathMLElementTagNameMap`\[`K`\]\>

##### Inherited from

`HTMLElement.getElementsByTagName`

#### Call Signature

> **getElementsByTagName**\<`K`\>(`qualifiedName`): `HTMLCollectionOf`\<`HTMLElementDeprecatedTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10925

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementDeprecatedTagNameMap`

##### Parameters

###### qualifiedName

`K`

##### Returns

`HTMLCollectionOf`\<`HTMLElementDeprecatedTagNameMap`\[`K`\]\>

##### Deprecated

##### Inherited from

`HTMLElement.getElementsByTagName`

#### Call Signature

> **getElementsByTagName**(`qualifiedName`): `HTMLCollectionOf`\<`Element`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10926

##### Parameters

###### qualifiedName

`string`

##### Returns

`HTMLCollectionOf`\<`Element`\>

##### Inherited from

`HTMLElement.getElementsByTagName`

***

### getElementsByTagNameNS()

#### Call Signature

> **getElementsByTagNameNS**(`namespaceURI`, `localName`): `HTMLCollectionOf`\<`HTMLElement`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10932

The **`Element.getElementsByTagNameNS()`** method returns a live HTMLCollection of elements with the given tag name belonging to the given namespace.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getElementsByTagNameNS)

##### Parameters

###### namespaceURI

`"http://www.w3.org/1999/xhtml"`

###### localName

`string`

##### Returns

`HTMLCollectionOf`\<`HTMLElement`\>

##### Inherited from

`HTMLElement.getElementsByTagNameNS`

#### Call Signature

> **getElementsByTagNameNS**(`namespaceURI`, `localName`): `HTMLCollectionOf`\<`SVGElement`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10933

##### Parameters

###### namespaceURI

`"http://www.w3.org/2000/svg"`

###### localName

`string`

##### Returns

`HTMLCollectionOf`\<`SVGElement`\>

##### Inherited from

`HTMLElement.getElementsByTagNameNS`

#### Call Signature

> **getElementsByTagNameNS**(`namespaceURI`, `localName`): `HTMLCollectionOf`\<`MathMLElement`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10934

##### Parameters

###### namespaceURI

`"http://www.w3.org/1998/Math/MathML"`

###### localName

`string`

##### Returns

`HTMLCollectionOf`\<`MathMLElement`\>

##### Inherited from

`HTMLElement.getElementsByTagNameNS`

#### Call Signature

> **getElementsByTagNameNS**(`namespace`, `localName`): `HTMLCollectionOf`\<`Element`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10935

##### Parameters

###### namespace

`string` | `null`

###### localName

`string`

##### Returns

`HTMLCollectionOf`\<`Element`\>

##### Inherited from

`HTMLElement.getElementsByTagNameNS`

***

### getHTML()

> **getHTML**(`options?`): `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10941

The **`getHTML()`** method of the Element interface is used to serialize an element's DOM to an HTML string.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getHTML)

#### Parameters

##### options?

`GetHTMLOptions`

#### Returns

`string`

#### Inherited from

`HTMLElement.getHTML`

***

### getRootNode()

> **getRootNode**(`options?`): `Node`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21772

The **`getRootNode()`** method of the Node interface returns the context object's root, which optionally includes the shadow root if it is available.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/getRootNode)

#### Parameters

##### options?

`GetRootNodeOptions`

#### Returns

`Node`

#### Inherited from

`HTMLElement.getRootNode`

***

### hasAttribute()

> **hasAttribute**(`qualifiedName`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10947

The **`Element.hasAttribute()`** method returns a **Boolean** value indicating whether the specified element has the specified attribute or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasAttribute)

#### Parameters

##### qualifiedName

`string`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.hasAttribute`

***

### hasAttributeNS()

> **hasAttributeNS**(`namespace`, `localName`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10953

The **`hasAttributeNS()`** method of the Element interface returns a boolean value indicating whether the current element has the specified attribute with the specified namespace.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasAttributeNS)

#### Parameters

##### namespace

`string` | `null`

##### localName

`string`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.hasAttributeNS`

***

### hasAttributes()

> **hasAttributes**(): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10959

The **`hasAttributes()`** method of the Element interface returns a boolean value indicating whether the current element has any attributes or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasAttributes)

#### Returns

`boolean`

#### Inherited from

`HTMLElement.hasAttributes`

***

### hasChildNodes()

> **hasChildNodes**(): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21778

The **`hasChildNodes()`** method of the Node interface returns a boolean value indicating whether the given Node has child nodes or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/hasChildNodes)

#### Returns

`boolean`

#### Inherited from

`HTMLElement.hasChildNodes`

***

### hasPointerCapture()

> **hasPointerCapture**(`pointerId`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10965

The **`hasPointerCapture()`** method of the pointer capture for the pointer identified by the given pointer ID.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasPointerCapture)

#### Parameters

##### pointerId

`number`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.hasPointerCapture`

***

### hidePopover()

> **hidePopover**(): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13826

The **`hidePopover()`** method of the HTMLElement interface hides a popover element (i.e., one that has a valid `popover` attribute) by removing it from the top layer and styling it with `display: none`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/hidePopover)

#### Returns

`void`

#### Inherited from

`HTMLElement.hidePopover`

***

### checkVisibility()

> **checkVisibility**(`options?`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10852

The **`checkVisibility()`** method of the Element interface checks whether the element is visible.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/checkVisibility)

#### Parameters

##### options?

`CheckVisibilityOptions`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.checkVisibility`

***

### insertAdjacentElement()

> **insertAdjacentElement**(`where`, `element`): `Element` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10971

The **`insertAdjacentElement()`** method of the relative to the element it is invoked upon.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentElement)

#### Parameters

##### where

`InsertPosition`

##### element

`Element`

#### Returns

`Element` \| `null`

#### Inherited from

`HTMLElement.insertAdjacentElement`

***

### insertAdjacentHTML()

> **insertAdjacentHTML**(`position`, `string`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10977

The **`insertAdjacentHTML()`** method of the the resulting nodes into the DOM tree at a specified position.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentHTML)

#### Parameters

##### position

`InsertPosition`

##### string

`string`

#### Returns

`void`

#### Inherited from

`HTMLElement.insertAdjacentHTML`

***

### insertAdjacentText()

> **insertAdjacentText**(`where`, `data`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10983

The **`insertAdjacentText()`** method of the Element interface, given a relative position and a string, inserts a new text node at the given position relative to the element it is called from.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentText)

#### Parameters

##### where

`InsertPosition`

##### data

`string`

#### Returns

`void`

#### Inherited from

`HTMLElement.insertAdjacentText`

***

### insertBefore()

> **insertBefore**\<`T`\>(`node`, `child`): `T`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21784

The **`insertBefore()`** method of the Node interface inserts a node before a _reference node_ as a child of a specified _parent node_.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/insertBefore)

#### Type Parameters

##### T

`T` *extends* `Node`

#### Parameters

##### node

`T`

##### child

`Node` | `null`

#### Returns

`T`

#### Inherited from

`HTMLElement.insertBefore`

***

### isDefaultNamespace()

> **isDefaultNamespace**(`namespace`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21790

The **`isDefaultNamespace()`** method of the Node interface accepts a namespace URI as an argument.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isDefaultNamespace)

#### Parameters

##### namespace

`string` | `null`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.isDefaultNamespace`

***

### isEqualNode()

> **isEqualNode**(`otherNode`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21796

The **`isEqualNode()`** method of the Node interface tests whether two nodes are equal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isEqualNode)

#### Parameters

##### otherNode

`Node` | `null`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.isEqualNode`

***

### isSameNode()

> **isSameNode**(`otherNode`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21802

The **`isSameNode()`** method of the Node interface is a legacy alias the for the `===` strict equality operator.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isSameNode)

#### Parameters

##### otherNode

`Node` | `null`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.isSameNode`

***

### lookupNamespaceURI()

> **lookupNamespaceURI**(`prefix`): `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21808

The **`lookupNamespaceURI()`** method of the Node interface takes a prefix as parameter and returns the namespace URI associated with it on the given node if found (and `null` if not).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/lookupNamespaceURI)

#### Parameters

##### prefix

`string` | `null`

#### Returns

`string` \| `null`

#### Inherited from

`HTMLElement.lookupNamespaceURI`

***

### lookupPrefix()

> **lookupPrefix**(`namespace`): `string` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21814

The **`lookupPrefix()`** method of the Node interface returns a string containing the prefix for a given namespace URI, if present, and `null` if not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/lookupPrefix)

#### Parameters

##### namespace

`string` | `null`

#### Returns

`string` \| `null`

#### Inherited from

`HTMLElement.lookupPrefix`

***

### matches()

> **matches**(`selectors`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10989

The **`matches()`** method of the Element interface tests whether the element would be selected by the specified CSS selector.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/matches)

#### Parameters

##### selectors

`string`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.matches`

***

### normalize()

> **normalize**(): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21820

The **`normalize()`** method of the Node interface puts the specified node and all of its sub-tree into a _normalized_ form.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/normalize)

#### Returns

`void`

#### Inherited from

`HTMLElement.normalize`

***

### prepend()

> **prepend**(...`nodes`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22702

Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/prepend)

#### Parameters

##### nodes

...(`string` \| `Node`)[]

#### Returns

`void`

#### Inherited from

`HTMLElement.prepend`

***

### querySelector()

#### Call Signature

> **querySelector**\<`K`\>(`selectors`): `HTMLElementTagNameMap`\[`K`\] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22708

Returns the first element that is a descendant of node that matches selectors.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`HTMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

`HTMLElement.querySelector`

#### Call Signature

> **querySelector**\<`K`\>(`selectors`): `SVGElementTagNameMap`\[`K`\] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22709

##### Type Parameters

###### K

`K` *extends* keyof `SVGElementTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`SVGElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

`HTMLElement.querySelector`

#### Call Signature

> **querySelector**\<`K`\>(`selectors`): `MathMLElementTagNameMap`\[`K`\] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22710

##### Type Parameters

###### K

`K` *extends* keyof `MathMLElementTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`MathMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

`HTMLElement.querySelector`

#### Call Signature

> **querySelector**\<`K`\>(`selectors`): `HTMLElementDeprecatedTagNameMap`\[`K`\] \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22712

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementDeprecatedTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`HTMLElementDeprecatedTagNameMap`\[`K`\] \| `null`

##### Deprecated

##### Inherited from

`HTMLElement.querySelector`

#### Call Signature

> **querySelector**\<`E`\>(`selectors`): `E` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22713

##### Type Parameters

###### E

`E` *extends* `Element` = `Element`

##### Parameters

###### selectors

`string`

##### Returns

`E` \| `null`

##### Inherited from

`HTMLElement.querySelector`

***

### querySelectorAll()

#### Call Signature

> **querySelectorAll**\<`K`\>(`selectors`): `NodeListOf`\<`HTMLElementTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22719

Returns all element descendants of node that match selectors.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`NodeListOf`\<`HTMLElementTagNameMap`\[`K`\]\>

##### Inherited from

`HTMLElement.querySelectorAll`

#### Call Signature

> **querySelectorAll**\<`K`\>(`selectors`): `NodeListOf`\<`SVGElementTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22720

##### Type Parameters

###### K

`K` *extends* keyof `SVGElementTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`NodeListOf`\<`SVGElementTagNameMap`\[`K`\]\>

##### Inherited from

`HTMLElement.querySelectorAll`

#### Call Signature

> **querySelectorAll**\<`K`\>(`selectors`): `NodeListOf`\<`MathMLElementTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22721

##### Type Parameters

###### K

`K` *extends* keyof `MathMLElementTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`NodeListOf`\<`MathMLElementTagNameMap`\[`K`\]\>

##### Inherited from

`HTMLElement.querySelectorAll`

#### Call Signature

> **querySelectorAll**\<`K`\>(`selectors`): `NodeListOf`\<`HTMLElementDeprecatedTagNameMap`\[`K`\]\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22723

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementDeprecatedTagNameMap`

##### Parameters

###### selectors

`K`

##### Returns

`NodeListOf`\<`HTMLElementDeprecatedTagNameMap`\[`K`\]\>

##### Deprecated

##### Inherited from

`HTMLElement.querySelectorAll`

#### Call Signature

> **querySelectorAll**\<`E`\>(`selectors`): `NodeListOf`\<`E`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22724

##### Type Parameters

###### E

`E` *extends* `Element` = `Element`

##### Parameters

###### selectors

`string`

##### Returns

`NodeListOf`\<`E`\>

##### Inherited from

`HTMLElement.querySelectorAll`

***

### releasePointerCapture()

> **releasePointerCapture**(`pointerId`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:10995

The **`releasePointerCapture()`** method of the previously set for a specific (PointerEvent) _pointer_.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/releasePointerCapture)

#### Parameters

##### pointerId

`number`

#### Returns

`void`

#### Inherited from

`HTMLElement.releasePointerCapture`

***

### remove()

> **remove**(): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:7967

Removes node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/remove)

#### Returns

`void`

#### Inherited from

`HTMLElement.remove`

***

### removeAttribute()

> **removeAttribute**(`qualifiedName`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11001

The Element method **`removeAttribute()`** removes the attribute with the specified name from the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttribute)

#### Parameters

##### qualifiedName

`string`

#### Returns

`void`

#### Inherited from

`HTMLElement.removeAttribute`

***

### removeAttributeNode()

> **removeAttributeNode**(`attr`): `Attr`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11013

The **`removeAttributeNode()`** method of the Element interface removes the specified Attr node from the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttributeNode)

#### Parameters

##### attr

`Attr`

#### Returns

`Attr`

#### Inherited from

`HTMLElement.removeAttributeNode`

***

### removeAttributeNS()

> **removeAttributeNS**(`namespace`, `localName`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11007

The **`removeAttributeNS()`** method of the If you are working with HTML and you don't need to specify the requested attribute as being part of a specific namespace, use the Element.removeAttribute() method instead.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttributeNS)

#### Parameters

##### namespace

`string` | `null`

##### localName

`string`

#### Returns

`void`

#### Inherited from

`HTMLElement.removeAttributeNS`

***

### removeEventListener()

#### Call Signature

> **removeEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13841

##### Type Parameters

###### K

`K` *extends* keyof `HTMLElementEventMap`

##### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` | `EventListenerOptions`

##### Returns

`void`

##### Inherited from

`HTMLElement.removeEventListener`

#### Call Signature

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13842

##### Parameters

###### type

`string`

###### listener

`EventListenerOrEventListenerObject`

###### options?

`boolean` | `EventListenerOptions`

##### Returns

`void`

##### Inherited from

`HTMLElement.removeEventListener`

***

### removeChild()

> **removeChild**\<`T`\>(`child`): `T`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21826

The **`removeChild()`** method of the Node interface removes a child node from the DOM and returns the removed node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/removeChild)

#### Type Parameters

##### T

`T` *extends* `Node`

#### Parameters

##### child

`T`

#### Returns

`T`

#### Inherited from

`HTMLElement.removeChild`

***

### replaceChild()

> **replaceChild**\<`T`\>(`node`, `child`): `T`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:21832

The **`replaceChild()`** method of the Node interface replaces a child node within the given (parent) node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/replaceChild)

#### Type Parameters

##### T

`T` *extends* `Node`

#### Parameters

##### node

`Node`

##### child

`T`

#### Returns

`T`

#### Inherited from

`HTMLElement.replaceChild`

***

### replaceChildren()

> **replaceChildren**(...`nodes`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:22732

Replace all children of node with nodes, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/replaceChildren)

#### Parameters

##### nodes

...(`string` \| `Node`)[]

#### Returns

`void`

#### Inherited from

`HTMLElement.replaceChildren`

***

### replaceWith()

> **replaceWith**(...`nodes`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:7975

Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/replaceWith)

#### Parameters

##### nodes

...(`string` \| `Node`)[]

#### Returns

`void`

#### Inherited from

`HTMLElement.replaceWith`

***

### requestFullscreen()

> **requestFullscreen**(`options?`): `Promise`\<`void`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11019

The **`Element.requestFullscreen()`** method issues an asynchronous request to make the element be displayed in fullscreen mode.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/requestFullscreen)

#### Parameters

##### options?

`FullscreenOptions`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`HTMLElement.requestFullscreen`

***

### requestPointerLock()

> **requestPointerLock**(`options?`): `Promise`\<`void`\>

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11025

The **`requestPointerLock()`** method of the Element interface lets you asynchronously ask for the pointer to be locked on the given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/requestPointerLock)

#### Parameters

##### options?

`PointerLockOptions`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`HTMLElement.requestPointerLock`

***

### scroll()

#### Call Signature

> **scroll**(`options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11031

The **`scroll()`** method of the Element interface scrolls the element to a particular set of coordinates inside a given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scroll)

##### Parameters

###### options?

`ScrollToOptions`

##### Returns

`void`

##### Inherited from

`HTMLElement.scroll`

#### Call Signature

> **scroll**(`x`, `y`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11032

##### Parameters

###### x

`number`

###### y

`number`

##### Returns

`void`

##### Inherited from

`HTMLElement.scroll`

***

### scrollBy()

#### Call Signature

> **scrollBy**(`options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11038

The **`scrollBy()`** method of the Element interface scrolls an element by the given amount.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollBy)

##### Parameters

###### options?

`ScrollToOptions`

##### Returns

`void`

##### Inherited from

`HTMLElement.scrollBy`

#### Call Signature

> **scrollBy**(`x`, `y`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11039

##### Parameters

###### x

`number`

###### y

`number`

##### Returns

`void`

##### Inherited from

`HTMLElement.scrollBy`

***

### scrollIntoView()

> **scrollIntoView**(`arg?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11045

The Element interface's **`scrollIntoView()`** method scrolls the element's ancestor containers such that the element on which `scrollIntoView()` is called is visible to the user.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollIntoView)

#### Parameters

##### arg?

`boolean` | `ScrollIntoViewOptions`

#### Returns

`void`

#### Inherited from

`HTMLElement.scrollIntoView`

***

### scrollTo()

#### Call Signature

> **scrollTo**(`options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11051

The **`scrollTo()`** method of the Element interface scrolls to a particular set of coordinates inside a given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollTo)

##### Parameters

###### options?

`ScrollToOptions`

##### Returns

`void`

##### Inherited from

`HTMLElement.scrollTo`

#### Call Signature

> **scrollTo**(`x`, `y`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11052

##### Parameters

###### x

`number`

###### y

`number`

##### Returns

`void`

##### Inherited from

`HTMLElement.scrollTo`

***

### setAttribute()

> **setAttribute**(`qualifiedName`, `value`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11058

The **`setAttribute()`** method of the Element interface sets the value of an attribute on the specified element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)

#### Parameters

##### qualifiedName

`string`

##### value

`string`

#### Returns

`void`

#### Inherited from

`HTMLElement.setAttribute`

***

### setAttributeNode()

> **setAttributeNode**(`attr`): `Attr` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11070

The **`setAttributeNode()`** method of the Element interface adds a new Attr node to the specified element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttributeNode)

#### Parameters

##### attr

`Attr`

#### Returns

`Attr` \| `null`

#### Inherited from

`HTMLElement.setAttributeNode`

***

### setAttributeNodeNS()

> **setAttributeNodeNS**(`attr`): `Attr` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11076

The **`setAttributeNodeNS()`** method of the Element interface adds a new namespaced Attr node to an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttributeNodeNS)

#### Parameters

##### attr

`Attr`

#### Returns

`Attr` \| `null`

#### Inherited from

`HTMLElement.setAttributeNodeNS`

***

### setAttributeNS()

> **setAttributeNS**(`namespace`, `qualifiedName`, `value`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11064

`setAttributeNS` adds a new attribute or changes the value of an attribute with the given namespace and name.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttributeNS)

#### Parameters

##### namespace

`string` | `null`

##### qualifiedName

`string`

##### value

`string`

#### Returns

`void`

#### Inherited from

`HTMLElement.setAttributeNS`

***

### setHTMLUnsafe()

> **setHTMLUnsafe**(`html`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11082

The **`setHTMLUnsafe()`** method of the Element interface is used to parse a string of HTML into a DocumentFragment, optionally filtering out unwanted elements and attributes, and those that don't belong in the context, and then using it to replace the element's subtree in the DOM.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setHTMLUnsafe)

#### Parameters

##### html

`string`

#### Returns

`void`

#### Inherited from

`HTMLElement.setHTMLUnsafe`

***

### setPointerCapture()

> **setPointerCapture**(`pointerId`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11088

The **`setPointerCapture()`** method of the _capture target_ of future pointer events.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setPointerCapture)

#### Parameters

##### pointerId

`number`

#### Returns

`void`

#### Inherited from

`HTMLElement.setPointerCapture`

***

### showPopover()

> **showPopover**(): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13832

The **`showPopover()`** method of the HTMLElement interface shows a Popover_API element (i.e., one that has a valid `popover` attribute) by adding it to the top layer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/showPopover)

#### Returns

`void`

#### Inherited from

`HTMLElement.showPopover`

***

### toggleAttribute()

> **toggleAttribute**(`qualifiedName`, `force?`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11094

The **`toggleAttribute()`** method of the present and adding it if it is not present) on the given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/toggleAttribute)

#### Parameters

##### qualifiedName

`string`

##### force?

`boolean`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.toggleAttribute`

***

### togglePopover()

> **togglePopover**(`options?`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:13838

The **`togglePopover()`** method of the HTMLElement interface toggles a Popover_API element (i.e., one that has a valid `popover` attribute) between the hidden and showing states.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/togglePopover)

#### Parameters

##### options?

`boolean`

#### Returns

`boolean`

#### Inherited from

`HTMLElement.togglePopover`

***

### ~~webkitMatchesSelector()~~

> **webkitMatchesSelector**(`selectors`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11100

#### Parameters

##### selectors

`string`

#### Returns

`boolean`

#### Deprecated

This is a legacy alias of `matches`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/matches)

#### Inherited from

`HTMLElement.webkitMatchesSelector`

***

### define()

> `static` **define**(): `void`

Defined in: [src/polyfea-context.ts:33](https://github.com/polyfea/core/blob/main/src/polyfea-context.ts#L33)

Defines the custom element 'polyfea-context' if not already defined *

#### Returns

`void`
