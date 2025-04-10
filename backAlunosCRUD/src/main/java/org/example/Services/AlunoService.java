package org.example.Services;

import org.example.Models.Aluno;
import org.example.Repositories.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    @Autowired //we want the framework to instanciate/materialize this componet for us. @Autowired does just that
    private AlunoRepository alunoRepository;

    public List<Aluno> allAlunos(){
        return alunoRepository.findAll() ;
    }

    public Optional<Aluno> singleAluno(String id){
        return alunoRepository.findById(id);
    }

    public Aluno saveAluno(Aluno aluno){
        alunoRepository.save(aluno);
        return aluno;
    }

    public void deleteSingleAluno(String id){
        alunoRepository.deleteById(id);
    }

}
