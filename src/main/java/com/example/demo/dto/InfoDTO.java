package com.example.demo.dto;
import com.example.demo.model.Info;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class InfoDTO {
    private int id;
    private String full_name;
    private String title;
    private String email;
    private String phone;
    private String department;
    private String location;
    private String workArea;
    private String manager;
    private List<String> imageUrls;

    // Constructor used in ProductService
    public InfoDTO(Info info, List<String> imageUrls) {
        this.id = info.getId();
        this.full_name = info.getFull_name();
        this.title = info.getTitle();
        this.email = info.getEmail();
        this.phone = info.getPhone();
        this.department = info.getDepartment();
        this.location = info.getLocation();
        this.workArea = info.getWorkArea();
        this.manager = info.getManager();
        this.imageUrls = imageUrls;
    }
}
