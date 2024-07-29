export class CategoryEntity{
    constructor(
        public id:string,
        public name:string,
        public description:string,
        public image:string,
        public isBlocked?:boolean,
        public coursesCount?:number
    ){}
}