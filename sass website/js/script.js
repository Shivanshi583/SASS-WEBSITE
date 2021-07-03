document.querySelector(".button-container")
.addEventListener("click",()=>{
    let text= document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredjobs = filterJobs(jobs,text);
        showJobs(filteredjobs)
    })

})
function getJobs(){
    return fetch("data.json")//GET API OR GET ANYTHING ELSE
    .then(response => response.json())//WAIT FOR RESOPONSE THAT COMES OUT
    .then(data=> {
        return data;
    });
}
function filterJobs(jobs,searchtext){
    if(searchtext){
        let filteredjobs = jobs.filter(job => {
         if(job.roleName.toLowerCase().includes(searchtext)
        || job.type.toLowerCase().includes(searchtext)
        || job.company.toLowerCase().includes(searchtext)
        || job.requirements.content.toLowerCase().
        includes(searchtext) ){
            return true;
        }
        else{
            return false;
        }
        })
        return filteredjobs;
    }
    else{
        return jobs;
    }
}
 
function showJobs(jobs){
 let jobsContainer = document.querySelector(".jobs-container")
 let jobsHtml = ""
 jobs.forEach(job => {
     jobsHtml += `<div class="job-tile">
 <div class="top">
     <img src="${job.logo}">
     <span class=" material-icons more_horiz">more_horiz</span>
 </div>
 <div class="rolename">
    <span>${job.roleName}</span>
 </div>
 <div class="description">
     <span>${job.requirements.content}</span>
 </div>
 <div class="buttons">
    <div class="button apply-now">
     Apply-now
     </div>
    <div class="button">
        message
     </div>
 </div>
        </div>
        `
     
 
 })
 jobsContainer.innerHTML = jobsHtml;
}

 
//when the aplication is loaded
 getJobs().then(data => {
     showJobs(data);
 })