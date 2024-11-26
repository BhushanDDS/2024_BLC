//SPDX-License-Identifier: MIT
 pragma solidity >=0.5.0 <0.8.27;
 contract MyVoting {
 struct Candidate {
 uint256 id;
 string name;
 uint256 voteCount;
 }
 mapping(address => bool) public voters;
 mapping(uint256 => Candidate) public candidates;
 uint256 public candidateCount;
 event votedEvent(uint256 indexed _candidateId);
 constructor() public {
 addCandidate("Candidate 1");
 addCandidate("Candidate 2");
 addCandidate("Candidate 3");
 }
 function addCandidate(string memory _name) public {
 candidateCount++;
 candidates[candidateCount] = Candidate(candidateCount, _name, 0);
 }
 function vote(uint256 _candidateId) public {
 require(!voters[msg.sender], "You already voted");
require(_candidateId > 0 && _candidateId <= candidateCount);
 voters[msg.sender] = true;
 candidates[_candidateId].voteCount++;
 emit votedEvent(_candidateId);
 }
 function getCandidateDetails(uint _candidateId) public view returns (uint,string memory,uint)
 {
 return (candidates[_candidateId].id, candidates[_candidateId].name,
 candidates[_candidateId].voteCount);
 }
 }