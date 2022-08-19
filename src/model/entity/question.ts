export enum QuestionType {
    CHECKBOX,
    COMMENTBOX,
    DATE,
    DROPDOWN,
    MATRIX_DROPDOW,
    MATRIX_RADIO,
    MULTIPLE_CHOICE,
    MULTIPLE_TEXTBOX,
    RADIO,
    RANKING,
    STAR,
    SLIDER,
    TEXTBOX
}


export abstract class Question {
    /**
     * The actual question
     */
    entitled: string;

    /**
     * tooltip text
     */
    tooltip: string;

    /**
     * The type of answer expected
     */
    type: QuestionType;

    /**
     * An answer is required for this question. By default true
     */
    required: boolean = true;

    /**
     * hide the question in the page. By default false
     */
    hidden: boolean = false;

    /**
     * the position in the page
     */
    position: number;

    /**
     * question with score
     */
    scoreEnabled: boolean;
}

export class QuestionDropdown extends Question {

    /**
     * link between option number and the question ids to show
     */
    showLogic: Map<number, number[]>;

    /**
     * link between option number and the page numbers to hide
     */
    skipLogic: Map<number, number[]>;

    /**
     * options in dropdown with score
     */
    options: Map<string, number>;

    constructor() {
        super();
        this.type = QuestionType.DROPDOWN;
    }

}

