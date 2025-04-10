package org.example.Controllers;

import org.example.Models.Aluno;
import org.example.Services.AlunoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AlunoController {

    @Autowired private AlunoService alunoService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Aluno>> getAllAlunos(){
        return new ResponseEntity<List<Aluno>>(alunoService.allAlunos(), HttpStatus.OK);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<Aluno>> getSinglAlunos(@PathVariable String id){
        return new ResponseEntity<Optional<Aluno>>(alunoService.singleAluno(id), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Aluno> newAluno(@RequestBody Aluno aluno) {
        return new ResponseEntity<Aluno>(alunoService.saveAluno(aluno), HttpStatus.CREATED);

    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Aluno> editAluno(@RequestBody Aluno aluno){
        Aluno updatedAluno = alunoService.saveAluno(aluno);
        return ResponseEntity.ok(updatedAluno);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable("id") String id){
        alunoService.deleteSingleAluno(id);
        return ResponseEntity.noContent().build();
    }
}
